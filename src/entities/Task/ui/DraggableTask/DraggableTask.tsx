import { classNames } from '@/shared/lib/classNames';
import cls from './DraggableTask.module.scss';
import {TaskWrapper} from "@/entities/Task/ui/TaskWrapper/TaskWrapper.tsx";
import {useDraggable} from "@dnd-kit/core";
import {useEffect} from "react";
import {Priority} from "@/features/CreateNewTask/const/priorityConsts.tsx";

interface DraggableTaskProps {
    className?: string;
    taskTitle: string;
    taskUniqueTitle: string;
    taskId: number;
    statusId: number;
    onClick?: () => void;
    boardId: number;
    taskDescription: string | null
    taskPriority?: Priority
}

export const DraggableTask = (props: DraggableTaskProps) => {
    const { className, taskTitle, taskUniqueTitle, taskId, statusId, onClick, boardId, taskDescription, taskPriority} = props;

    const {setNodeRef, listeners, attributes} = useDraggable({
        id: `task-${taskId}`,
        data: {
            statusId: statusId,
            title: taskTitle,
            uniqueTitle: taskUniqueTitle
        }},
    )

    return (
        <TaskWrapper priority={taskPriority} taskDescription={taskDescription} taskId={taskId} boardId={boardId} onClick={onClick} attributes={attributes} listeners={listeners} ref={setNodeRef} taskTitle={taskTitle} taskUniqueTitle={taskUniqueTitle} className={classNames('', {}, [className])}/>
    )
};
