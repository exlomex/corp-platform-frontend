import { classNames } from '@/shared/lib/classNames';
import cls from './EditableTitle.module.scss';
import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {Button} from "@/shared/ui/Button";
import CorrectIcon from "@/shared/assets/icons/smallCorrectIcon.svg";
import CloseIcon from "@/shared/assets/icons/smallCloseIcon.svg";
import {useClickOutside} from "@/shared/hooks/useClickOutside";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {
    ChangeTaskTitleService,
    ChangeTaskTitleServiceInputData
} from "@/entities/Task";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

interface EditableTitleProps {
    className?: string;
    taskTitle: string;
    taskId: number;
    boardId: number;
    taskDescription: string | null
    isEditTitleActive: boolean;
    setIsEditTitleActive: Dispatch<SetStateAction<boolean>>;
    uniqueTitle: string;
}

export const EditableTitle = (props: EditableTitleProps) => {
    const { className, taskTitle, taskId, boardId, taskDescription, setIsEditTitleActive, isEditTitleActive, uniqueTitle } = props;

    const [taskTitleState, setTaskTitleState] = useState<string>(taskTitle)
    const [newTaskTitleValue, setNewTaskTitleValue] = useState<string>(taskTitle)

    const onCloseEditableAreaHandler = () => {
        setIsEditTitleActive(false)
    }

    const editableAreaRef = useClickOutside<HTMLDivElement>(onCloseEditableAreaHandler)

    const onTextAreaValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewTaskTitleValue(e?.target?.value)
    }

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        setTaskTitleState(taskTitle)
    }, [taskTitle]);

    useEffect(() => {
        if (isEditTitleActive) {
            const textArea = textAreaRef?.current
            textArea?.focus()
            const length = textArea?.value?.length;
            textArea.setSelectionRange(length, length)
        }
    }, [isEditTitleActive]);

    const dispatch = useAppDispatch()
    const selectedProject = useSelector(getProjectSelectedProject)

    const onSubmitEditHandler = async () => {
        if (newTaskTitleValue.trim() !== taskTitle && newTaskTitleValue.trim().length >= 1) {
            const editBody: ChangeTaskTitleServiceInputData = {
                changeData: {
                    id: taskId,
                    title: newTaskTitleValue,
                    description: taskDescription
                },
                projectId: selectedProject.id
            }

            try {
                await dispatch(ChangeTaskTitleService(editBody)).unwrap()
                await dispatch(fetchTaskInfoService({uniqueTitle: uniqueTitle, projectId: selectedProject.id})).unwrap();
                await dispatch(FetchBoardTasks({boardId: boardId, projectId: selectedProject.id})).unwrap()

                onCloseEditableAreaHandler()
                setTaskTitleState(newTaskTitleValue)
            } catch (e) {
                console.error(e?.message || e)
            }
        }

    }

    return (
        <div
            className={classNames(cls.EditableTaskTitle, {[cls.isActiveEditableArea]: isEditTitleActive}, [className])}
        >
            {!isEditTitleActive
                && <div
                    className={cls.TaskTitleWrapper}
                    onClick={() => setIsEditTitleActive(true)}
                >
                    <span className={cls.TaskTitle}>{taskTitleState}</span>
                </div>}

            {isEditTitleActive && (
                <div
                    onPointerDown={(e) => {e.stopPropagation()}}
                    className={cls.EditableArea}
                    ref={editableAreaRef}
                >
                    <textarea
                        ref={textAreaRef}
                        className={classNames(cls.TextArea, {}, [])} placeholder={'Что нужно сделать'}
                        value={newTaskTitleValue}
                        onChange={onTextAreaValueChange}
                    />
                    <div className={cls.EditableAreaBottomLine}>
                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            className={cls.CorrectButton}
                            onClick={onSubmitEditHandler}
                        >
                            <CorrectIcon/>
                        </Button>

                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            onClick={onCloseEditableAreaHandler}
                            className={cls.CloseButton}
                        >
                            <CloseIcon/>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
};
