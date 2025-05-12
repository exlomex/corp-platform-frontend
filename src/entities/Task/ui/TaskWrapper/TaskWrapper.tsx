import { classNames } from '@/shared/lib/classNames';
import cls from './TaskWrapper.module.scss';
import {ForwardedRef, forwardRef, useState} from "react";
import {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";
import {DraggableAttributes} from "@dnd-kit/core";
import {AdditionalTaskOptions} from "../AdditionalTaskOptions/AdditionalTaskOptions.tsx";
import {EditableTaskTitle} from "../EditableTaskTitle/EditableTaskTitle.tsx";
import {Priority, priorityIconMap} from "@/features/CreateNewTask/const/priorityConsts.tsx";
import {Tooltip} from "@/shared/ui/Tooltip";

interface TaskWrapperProps {
    className?: string;
    taskTitle: string;
    taskUniqueTitle: string;
    listeners?: SyntheticListenerMap;
    attributes?: DraggableAttributes;
    onClick?: () => void;
    taskId: number;
    boardId: number;
    taskDescription: string | null;
    priority?: Priority
}

export const TaskWrapper = forwardRef((props: TaskWrapperProps, ref: ForwardedRef<HTMLDivElement> ) => {
    const { className, taskTitle, taskUniqueTitle, attributes,listeners, onClick, taskId, boardId, taskDescription, priority} = props;

    const [isTaskHover, setIsTaskHover] = useState<boolean>(false);
    const [isEditTitleActive, setIsEditTitleActive] = useState<boolean>(false)

    return (
        <div
            onMouseEnter={() => setIsTaskHover(true)}
            onMouseLeave={() => setIsTaskHover(false)}
            {...attributes}
            {...listeners}
            onClick={onClick}
            ref={ref}
            className={classNames(cls.TaskWrapper, {[cls.taskEditActive]: isEditTitleActive}, [className])}>

            <div className={cls.TaskTopLine}>
                <EditableTaskTitle isEditTitleActive={isEditTitleActive} setIsEditTitleActive={setIsEditTitleActive} taskDescription={taskDescription} taskId={taskId} boardId={boardId} isHover={isTaskHover} taskTitle={taskTitle}/>

                <AdditionalTaskOptions taskId={taskId} uniqueTaskTitle={taskUniqueTitle} isHover={isTaskHover}/>
            </div>

            <div className={cls.TaskBottomLine}>
                <span className={cls.TaskUniqueTitle}>{taskUniqueTitle}</span>
                {priority && <Tooltip text={'Приоритет'}>
                    <span className={cls.Priority}>{priorityIconMap[priority]}</span>
                </Tooltip>}
            </div>
        </div>
    )
});
