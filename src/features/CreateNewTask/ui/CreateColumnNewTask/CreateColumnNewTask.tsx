import { classNames } from '@/shared/lib/classNames';
import cls from './CreateColumnNewTask.module.scss';
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Button} from "@/shared/ui/Button";
import CreateIcon from '@/shared/assets/icons/addIcon.svg'
import CloseIcon from '@/shared/assets/icons/smallCloseIcon.svg'
import CorrectIcon from '@/shared/assets/icons/smallCorrectIcon.svg'
import {useClickOutside} from "@/shared/hooks/useClickOutside";
import {
    createNewTaskService,
    createNewTaskServiceInputData
} from "@/features/CreateNewTask/model/services/createNewTaskService.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";

interface CreateColumnNewTaskProps {
    className?: string;
    isHovered?: boolean;
    statusId: number;
    boardId: number;
    projectId: number;
}

export const CreateColumnNewTask = (props: CreateColumnNewTaskProps) => {
    const { className, isHovered = true, projectId, statusId,boardId} = props;

    const [isActive, setIsActive] = useState<boolean>(false);

    const [taskValue, setTaskValue] = useState<string>('')

    const onTaskValueChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTaskValue(e.target.value)
    }

    const onOutsideClickHandler = () => {
        setIsActive(false)
    }

    const createTaskRef = useClickOutside<HTMLDivElement>(onOutsideClickHandler)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const onCreateButtonClickHandler = () => {
        setIsActive(true)
    }

    useEffect(() => {
        if (isActive) {
            const textArea = textAreaRef?.current
            textArea?.focus()
            const length = textArea?.value?.length;
            textArea.setSelectionRange(length, length)
        }
    }, [isActive]);

    const dispatch = useAppDispatch()
    const onSubmitCreateHandler = async () => {
        if (taskValue) {
            const createBody: createNewTaskServiceInputData = {
                boardId: boardId,
                projectId: projectId,
                statusId: statusId,
                title: taskValue
            }

            try {
                await dispatch(createNewTaskService(createBody)).unwrap()
                await dispatch(FetchBoardTasks({boardId: boardId}))

                setIsActive(false)
                setTaskValue('')
            } catch (e) {
                console.error(e?.message || e)
            }
        } else {
            setIsActive(false)
        }
    }

    return (
        <div
            ref={createTaskRef}
            onPointerDown={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className={classNames(cls.CreateColumnNewTask, {}, [className])}
        >
            {!isActive && isHovered && <Button
                className={cls.CreateButton}
                onClick={onCreateButtonClickHandler}
                fullWidth
                buttonType={'CREATE_WITH_ICON_BTN_FILLED'}
            >
                <CreateIcon/> Создать задачу
            </Button>}

            {isActive && (
                <div className={cls.CreateTaskArea}>
                    <textarea
                        ref={textAreaRef}
                        className={cls.TextArea} placeholder={'Что нужно сделать'}
                        value={taskValue}
                        onChange={onTaskValueChangeHandler}
                    />
                    <div className={cls.CreateTaskBottomLine}>
                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            className={cls.CorrectButton}
                            onClick={onSubmitCreateHandler}
                        >
                            <CorrectIcon/>
                        </Button>

                        <Button
                            buttonType={'SMALL_ICON_BTN_FILLED'}
                            onClick={() => setIsActive(false)}
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
