import { classNames } from '@/shared/lib/classNames';
import cls from './SubTaskModalContent.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {useSelector} from "react-redux";
import {
    getAddSubTaskError,
    getAddSubTaskSelectedTask,
    getBoardTasks, getBoardTasksIsFirstLoading, getProjectTreeTasks, getSelectedTaskInfo
} from "../../model/selectors/getTaskValues.ts";
import {ComboBox} from "@/shared/ui/ComboBox";
import {useEffect, useRef, useState} from "react";
import {FetchProjectTreeTasksService, TaskI} from "@/entities/Task";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {Button} from "@/shared/ui/Button";
import {AddSubTaskInputData, AddSubTaskService} from "../../model/services/addSubTaskService.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {useLocation, useParams} from "react-router";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {getRouteMain} from "@/shared/const/router.ts";

interface SubTaskModalContentProps {
    className?: string;
    onClose?: () => void
}

export const SubTaskModalContent = (props: SubTaskModalContentProps) => {
    const { className, onClose } = props;

    const selectedTaskInfoIntoCard = useSelector(getSelectedTaskInfo)

    // именно выбранная внутри модалки задача ->
    const selectedTaskInfo = useSelector(getAddSubTaskSelectedTask)
    const boardTasks = useSelector(getBoardTasks)

    const boardTasksIsFirstLoading = useSelector(getBoardTasksIsFirstLoading)

    const dispatch = useAppDispatch()
    const selectedProject = useSelector(getProjectSelectedProject)

    useEffect(() => {
        if (selectedTaskInfoIntoCard && selectedProject) {
            dispatch(FetchBoardTasks({boardId: selectedTaskInfoIntoCard?.boardId, projectId: selectedProject?.id}))
        }
    }, [boardTasks.length, boardTasksIsFirstLoading, dispatch, selectedProject, selectedTaskInfo, selectedTaskInfoIntoCard]);

    const filteredBoardTasks = useRef<TaskI[]>(null)
    const [normalizedBoardTasks, setNormalizedBoardTasks] = useState<ComboBoxOption[]>(null)

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchParamsSelectedTask = queryParams.get('selectedTask')

    useEffect(() => {
        console.log(boardTasks, 'boardTasks');
    }, [boardTasks]);


    useEffect(() => {
        if (selectedTaskInfoIntoCard?.id && boardTasks.length >= 1 && searchParamsSelectedTask !== null) {
            filteredBoardTasks.current = boardTasks.filter(task => task.uniqueTitle !== selectedTaskInfoIntoCard.uniqueTitle)

            setNormalizedBoardTasks(
                [{ label: 'Не выбрано', value: '' },
                    ...filteredBoardTasks.current.map(task => {
                        return {
                            id: task.id,
                            label: task.title,
                            value: task.uniqueTitle
                        }})]
            )
        } else if (boardTasks.length >= 1 && selectedTaskInfo?.uniqueTitle) {
            filteredBoardTasks.current = boardTasks.filter(task => task.uniqueTitle !== selectedTaskInfo.uniqueTitle)

            setNormalizedBoardTasks(
                [{ label: 'Не выбрано', value: '' },
                    ...filteredBoardTasks.current.map(task => {
                        return {
                            id: task.id,
                            label: task.title,
                            value: task.uniqueTitle
                        }})]
            )
        } else {
            setNormalizedBoardTasks(
                [{ label: 'Не выбрано', value: '' }]
            )
        }


    }, [boardTasks, searchParamsSelectedTask, selectedTaskInfo, selectedTaskInfoIntoCard]);

    const [selectedTask, setSelectedTask] = useState<ComboBoxOption | undefined>(null)

    const error = useSelector(getAddSubTaskError)

    const onSubmitAddSubtask = async () => {
        if (selectedTask.id) {
            let addSubTaskBody: AddSubTaskInputData

            if (selectedTaskInfoIntoCard?.id && searchParamsSelectedTask !== null) {
                addSubTaskBody = {
                    createData: {
                        parentTaskId: selectedTaskInfoIntoCard.id,
                        subtaskId: selectedTask.id
                    },
                    projectId: selectedProject.id
                }

                try {
                    await dispatch(AddSubTaskService(addSubTaskBody)).unwrap()
                    if (location.pathname === getRouteMain()) {
                        await dispatch(FetchProjectTreeTasksService({projectId: selectedProject.id}))
                    } else {
                        await dispatch(fetchTaskInfoService({uniqueTitle: selectedTaskInfoIntoCard.uniqueTitle,projectId: selectedProject.id}))
                    }

                    onClose()
                } catch (e) {
                    console.error(e?.message || e)
                }
            } else if (selectedTaskInfo?.id) {
                addSubTaskBody = {
                    createData: {
                        parentTaskId: selectedTaskInfo.id,
                        subtaskId: selectedTask.id
                    },
                    projectId: selectedProject.id
                }

                try {
                    await dispatch(AddSubTaskService(addSubTaskBody)).unwrap()
                    onClose()
                } catch (e) {
                    console.error(e?.message || e)
                }
            }
        }
    }

    const uniqueTitle = searchParamsSelectedTask !== null ? selectedTaskInfoIntoCard?.uniqueTitle ? selectedTaskInfoIntoCard?.uniqueTitle : selectedTaskInfoIntoCard?.uniqueTitle : selectedTaskInfo?.uniqueTitle

    return (
        <div className={classNames(cls.SubTaskModalContent, {}, [className])}>
            {error && <div className={cls.ErrorMessage}>{error}</div>}
            <Typography size={'PARAGRAPH-18-REGULAR'} className={cls.Heading} align={'LEFT'}>Добавление дочерней задачи</Typography>
            <Typography size={'PARAGRAPH-14-REGULAR'} className={cls.SubTitle} align={'LEFT'}>Для добавления необходимо выбрать задачу в поле ниже.</Typography>

            <div className={cls.UniqueTitleWrapper}>
                <Typography size={'PARAGRAPH-14-REGULAR'} align={'LEFT'}>Уникальное название родительской задачи:</Typography>
                <div className={cls.UniqueTitle}>{uniqueTitle}</div>
            </div>

            <form className={cls.SubTaskForm}>
                <div>
                    <label><Typography className={cls.formLabel} size={'PARAGRAPH-14-REGULAR'} align={'LEFT'}>Выберите задачу</Typography></label>
                    {normalizedBoardTasks && <ComboBox optionsClassName={cls.SubTaskOptions} position={'ABSOLUTE'} options={normalizedBoardTasks} setStateFunc={setSelectedTask}/>}
                </div>

                <div className={cls.BottomLine}>
                    <Button buttonType={'SMART_TEXT_BTN_FILLED'} onClick={onSubmitAddSubtask}>Добавить</Button>
                    <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onClose}>Отмена</Button>
                </div>
            </form>
        </div>
    )
};
