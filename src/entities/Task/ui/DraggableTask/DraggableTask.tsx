import { classNames } from '@/shared/lib/classNames';
import cls from './DraggableTask.module.scss';
import {TaskWrapper} from "@/entities/Task/ui/TaskWrapper/TaskWrapper.tsx";
import {useDraggable} from "@dnd-kit/core";

interface DraggableTaskProps {
    className?: string;
    taskTitle: string;
    taskUniqueTitle: string;
    taskId: number;
    statusId: number;
    onClick?: () => void;
}

export const DraggableTask = (props: DraggableTaskProps) => {
    const { className, taskTitle, taskUniqueTitle, taskId, statusId, onClick} = props;

    const {setNodeRef, listeners, attributes} = useDraggable({
        id: taskId,
        data: {
            statusId: statusId,
            title: taskTitle,
            uniqueTitle: taskUniqueTitle
        }},
    )

    return (
        <TaskWrapper onClick={onClick} attributes={attributes} listeners={listeners} ref={setNodeRef} taskTitle={taskTitle} taskUniqueTitle={taskUniqueTitle} className={classNames('', {}, [className])}/>
    )
};
