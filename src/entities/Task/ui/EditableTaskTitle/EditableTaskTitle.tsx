import { classNames } from '@/shared/lib/classNames';
import cls from './EditableTaskTitle.module.scss';
import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
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
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

interface EditableTitleProps {
    className?: string;
    taskTitle: string;
    isHover: boolean;
    taskId: number;
    boardId: number;
    taskDescription: string | null
    isEditTitleActive: boolean;
    setIsEditTitleActive: Dispatch<SetStateAction<boolean>>;
    editIsPossible: boolean;
}

export const EditableTaskTitle = (props: EditableTitleProps) => {
    const { className, taskTitle, isHover, taskId, boardId, taskDescription, setIsEditTitleActive, isEditTitleActive, editIsPossible } = props;

    const [taskTitleState, setTaskTitleState] = useState<string>(taskTitle)
    const [newTaskTitleValue, setNewTaskTitleValue] = useState<string>(taskTitle)

    const selectedProject = useSelector(getProjectSelectedProject)

    useEffect(() => {
        setTaskTitleState(taskTitle)
        setNewTaskTitleValue(taskTitle)
    }, [taskTitle]);

    const onCloseEditableAreaHandler = () => {
        setIsEditTitleActive(false)
    }

    const editableAreaRef = useClickOutside<HTMLDivElement>(onCloseEditableAreaHandler)

    const onTextAreaValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewTaskTitleValue(e?.target?.value)
    }

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (isEditTitleActive) {
            const textArea = textAreaRef?.current
            textArea?.focus()
            const length = textArea?.value?.length;
            textArea.setSelectionRange(length, length)
        }
    }, [isEditTitleActive]);

    const dispatch = useAppDispatch()

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
                await dispatch(FetchBoardTasks({boardId: boardId, projectId: selectedProject.id}))

                onCloseEditableAreaHandler()
                setTaskTitleState(newTaskTitleValue)
            } catch (e) {
                console.error(e?.message || e)
            }
        }

    }

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={classNames(cls.EditableTaskTitle, {
                [cls.isActiveEditableArea]: isEditTitleActive,
                [cls.EditIsNotPossible]: !editIsPossible
            }, [className])}
        >
            {!isEditTitleActive
                && <div
                    className={cls.TaskTitleWrapper}
                    onClick={() => {
                        if (editIsPossible) {
                            setIsEditTitleActive(true)
                        }
                    }}
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
