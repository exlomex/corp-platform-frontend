import { classNames } from '@/shared/lib/classNames';
import cls from './SubTaskModalContent.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {useSelector} from "react-redux";
import {
    getAddSubTaskError,
    getAddSubTaskSelectedTask,
    getBoardTasks
} from "../../model/selectors/getTaskValues.ts";
import {ComboBox} from "@/shared/ui/ComboBox";
import {useEffect, useRef, useState} from "react";
import {TaskI} from "@/entities/Task";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {Button} from "@/shared/ui/Button";
import {AddSubTaskInputData, AddSubTaskService} from "../../model/services/addSubTaskService.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {useParams} from "react-router";
import {getRouteProjectBoard} from "@/shared/const/router.ts";

interface SubTaskModalContentProps {
    className?: string;
    onClose?: () => void
}

export const SubTaskModalContent = (props: SubTaskModalContentProps) => {
    const { className, onClose } = props;

    const selectedTaskInfo = useSelector(getAddSubTaskSelectedTask)
    const boardTasks = useSelector(getBoardTasks)

    const filteredBoardTasks = useRef<TaskI[]>(null)
    const [normalizedBoardTasks, setNormalizedBoardTasks] = useState<ComboBoxOption[]>(null)

    useEffect(() => {
        if (boardTasks.length >= 1 && selectedTaskInfo) {
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
        }
    }, [boardTasks, selectedTaskInfo]);

    const [selectedTask, setSelectedTask] = useState<ComboBoxOption | undefined>(null)

    const error = useSelector(getAddSubTaskError)

    const params = useParams()
    const dispatch = useAppDispatch()
    const onSubmitAddSubtask = async () => {
        if (selectedTask.id) {
            const addSubTaskBody: AddSubTaskInputData = {
                parentTaskId: selectedTaskInfo.id,
                subtaskId: selectedTask.id
            }

            try {
                await dispatch(AddSubTaskService(addSubTaskBody)).unwrap()
                // await dispatch(FetchBoardTasks({boardId: +params?.board}))
                onClose()
            } catch (e) {
                console.error(e?.message || e)
            }
        }
    }

    return (
        <div className={classNames(cls.SubTaskModalContent, {}, [className])}>
            {error && <div className={cls.ErrorMessage}>{error}</div>}
            <Typography size={'PARAGRAPH-18-REGULAR'} className={cls.Heading} align={'LEFT'}>Добавление дочерней задачи</Typography>
            <Typography size={'PARAGRAPH-14-REGULAR'} className={cls.SubTitle} align={'LEFT'}>Для добавления необходимо выбрать задачу в поле ниже.</Typography>

            <div className={cls.UniqueTitleWrapper}>
                <Typography size={'PARAGRAPH-14-REGULAR'} align={'LEFT'}>Уникальное название родительской задачи:</Typography>
                <div className={cls.UniqueTitle}>{selectedTaskInfo.uniqueTitle}</div>
            </div>

            <form>
                <label><Typography className={cls.formLabel} size={'PARAGRAPH-14-REGULAR'} align={'LEFT'}>Выберите задачу</Typography></label>
                {normalizedBoardTasks && <ComboBox position={'ABSOLUTE'} options={normalizedBoardTasks} setStateFunc={setSelectedTask}/>}

                <div className={cls.BottomLine}>
                    <Button buttonType={'SMART_TEXT_BTN_FILLED'} onClick={onSubmitAddSubtask}>Добавить</Button>
                    <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onClose}>Отмена</Button>
                </div>
            </form>
        </div>
    )
};
