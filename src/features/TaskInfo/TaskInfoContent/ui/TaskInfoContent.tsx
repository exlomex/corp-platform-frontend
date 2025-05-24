import { classNames } from '@/shared/lib/classNames';
import cls from './TaskInfoContent.module.scss';
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";
import {useSelector} from "react-redux";
import {
    getSelectedTaskInfo,
    getSelectedTaskInfoIsFetching,
    getSelectedTaskUniqueTitle, getTaskNavigationHistory,
    TaskActions
} from "@/entities/Task";
import {EditableTitle} from "@/features/TaskInfo/EditableTitle/ui/EditableTitle.tsx";
import {Button} from "@/shared/ui/Button";
import MediumPlusIcon from "@/shared/assets/icons/mediumPlusIcon.svg"
import {EditableDescription} from "@/features/TaskInfo/EditableDescription/ui/EditableDescription.tsx";
import {Typography} from "@/shared/ui/Typography";
import {CommentsContent} from "../../Comments/ui/CommentsContent/CommentsContent.tsx";
import {FetchCommentsService} from "@/features/TaskInfo/Comments/model/services/fetchCommentsService.ts";
import {CommentActions} from "@/features/TaskInfo";
import {useNavigate} from "react-router";
import BackIcon from '@/shared/assets/icons/backIcon.svg'
import {AdditionalTaskInfo} from "../../AdditionalTaskInfo/AdditionalTaskInfo.tsx";
import {StatusActions} from "@/entities/Status";
import {EditableTaskPriority} from "../../EditableTaskPriority/EditableTaskPriority.tsx";
import {DropDown, DropdownItem} from "@/shared/ui/popups/DropDown/DropDown.tsx";
import {Theme} from "@/shared/types/theme.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

interface TaskInfoContentProps {
    className?: string;
}

export const TaskInfoContent = (props: TaskInfoContentProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const selectedUniqueTitle = useSelector(getSelectedTaskUniqueTitle)
    const selectedProject = useSelector(getProjectSelectedProject)

    useEffect(() => {
        if (selectedUniqueTitle) dispatch(fetchTaskInfoService({uniqueTitle: selectedUniqueTitle, projectId: selectedProject?.id}))
    }, [dispatch, selectedProject, selectedUniqueTitle]);

    const selectedTaskInfo = useSelector(getSelectedTaskInfo)
    const selectedTaskInfoIsFetching = useSelector(getSelectedTaskInfoIsFetching)

    const [isEditTitleActive, setIsEditTitleActive] = useState<boolean>(false)
    const [isEditDescriptionActive, setIsEditDescriptionActive] = useState<boolean>(false)

    // if (!selectedTaskInfo || selectedTaskInfoIsFetching) {
    //     return  <div className={classNames(cls.TaskInfoContent, {}, [className])}></div>
    // }

    useEffect(() => {
        if (selectedTaskInfo && selectedTaskInfo.id) {
            dispatch(FetchCommentsService({taskId: selectedTaskInfo?.id}))
        }
    }, [dispatch, selectedTaskInfo]);

    const navigate = useNavigate()

    const onSubtaskClickHandler = (taskTitle: string) => () => {
        if (selectedTaskInfo?.uniqueTitle) {
            dispatch(TaskActions.pushToNavigationHistory(selectedTaskInfo.uniqueTitle));
        }

        dispatch(StatusActions.setSelectedTaskBoardStatuses([]))
        dispatch(TaskActions.setSelectedTaskInfo(undefined))
        dispatch(CommentActions.resetSlice())
        // dispatch(TaskActions.setSelectedTaskUniqueTitle(''))

        setIsEditDescriptionActive(false)

        navigate({
            pathname: location.pathname,
            search: `?selectedTask=${taskTitle}`,
        });
    }

    const taskHistory = useSelector(getTaskNavigationHistory);

    const onBackButtonClickHandler = () => {
        if (taskHistory.length === 0) return;

        const previousTitle = taskHistory[taskHistory.length - 1];

        dispatch(TaskActions.popFromNavigationHistory());
        dispatch(TaskActions.setSelectedTaskInfo(undefined));
        dispatch(CommentActions.resetSlice());
        dispatch(StatusActions.setSelectedTaskBoardStatuses([]))

        setIsEditDescriptionActive(false)

        navigate({
            pathname: location.pathname,
            search: `?selectedTask=${previousTitle}`,
        });
    };

    const AddToTaskButtonItems: DropdownItem[] = [
        {
            content: 'Подзадачу',
            onClick: () => {dispatch(TaskActions.setIsOpenSubTaskModal(true))}
        },
    ]

    return (
        <div className={classNames(cls.TaskInfoContent, {}, [className])}>
            <div className={cls.TaskInfoLeftSide}>
                {taskHistory.length >= 1 && <Button buttonType={'SMART_WITH_ICON_BTN_OUTLINED'} onClick={onBackButtonClickHandler} className={cls.PrevButton}><BackIcon/> Назад</Button>}
                <div className={cls.editableTitleWrapper}>
                    {(!selectedTaskInfo || selectedTaskInfoIsFetching)
                        ? <Typography className={cls.FieldName} size={'PARAGRAPH-18-REGULAR'}>Задача</Typography>
                        : <EditableTitle
                            uniqueTitle={selectedTaskInfo.uniqueTitle}
                            className={cls.EditableTitle}
                            taskTitle={selectedTaskInfo.title}
                            taskId={selectedTaskInfo.id}
                            boardId={selectedTaskInfo.boardId}
                            taskDescription={selectedTaskInfo.description}
                            isEditTitleActive={isEditTitleActive}
                            setIsEditTitleActive={setIsEditTitleActive}
                        />
                    }

                </div>

                <DropDown
                    menuItemsClassName={cls.CustomDropDown}
                    items={AddToTaskButtonItems}
                    trigger={<Button className={cls.ExtraAddButton} buttonType={'SMART_WITH_ICON_BTN_OUTLINED'}><MediumPlusIcon/> Добавить</Button>}
                    direction={'bottom start'}
                    gap={6}
                    fSize={14}
                    theme={Theme.LIGHT_THEME}
                />

                <Typography size={'PARAGRAPH-18-REGULAR'}>Детали задачи</Typography>

                <div className={cls.TaskDetails}>
                    <p className={cls.TaskDetailsLabel}>Приоритет: </p>
                    <EditableTaskPriority />
                </div>

                {(!selectedTaskInfo || selectedTaskInfoIsFetching)
                    ? <Typography className={cls.FieldName} size={'TEXT-20-MEDIUM'}>Описание</Typography>
                    : <EditableDescription
                        className={cls.EditableTitle}
                        taskTitle={selectedTaskInfo.title}
                        taskId={selectedTaskInfo.id}
                        uniqueTitle={selectedTaskInfo.uniqueTitle}
                        boardId={selectedTaskInfo.boardId}
                        taskDescription={selectedTaskInfo.description}
                        isEditDescriptionActive={isEditDescriptionActive}
                        setIsEditDescriptionActive={setIsEditDescriptionActive}
                    />
                }

                <div className={cls.TaskChildrenWrapper}>
                    {selectedTaskInfo && !selectedTaskInfoIsFetching && selectedTaskInfo?.subtasks.length >= 1 && (
                        <>
                            <Typography size={'PARAGRAPH-14-REGULAR'}>Родитель для</Typography>
                            <span className={cls.SubTaskLine}></span>

                            <div className={cls.SubTasks}>
                                {selectedTaskInfo.subtasks.map(subTask => (
                                    <div key={subTask.id} className={cls.Subtask} onClick={onSubtaskClickHandler(subTask.uniqueTitle)}>
                                        <span className={cls.SubTaskUniqueTitle}>{subTask.uniqueTitle}</span>
                                        <span className={cls.SubTaskTitle}>{subTask.title}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )

                    }
                </div>

                {selectedTaskInfo && <CommentsContent/>}
            </div>

            <AdditionalTaskInfo/>
        </div>
    )
};