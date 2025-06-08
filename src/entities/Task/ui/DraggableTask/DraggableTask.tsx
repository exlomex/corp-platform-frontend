import { classNames } from '@/shared/lib/classNames';
import {TaskWrapper} from "@/entities/Task/ui/TaskWrapper/TaskWrapper.tsx";
import {useDraggable} from "@dnd-kit/core";
import {TaskUser} from "@/entities/Task/model/types/taskSliceSchema.ts";
import {Priority} from "@/entities/Task";

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
    assignee?: TaskUser
    editIsPossible: boolean;
}

export const DraggableTask = (props: DraggableTaskProps) => {
    const { className, taskTitle, taskUniqueTitle, taskId, statusId, onClick, boardId, taskDescription, taskPriority, assignee, editIsPossible} = props;

    const {setNodeRef, listeners, attributes} = useDraggable({
        id: `task-${taskId}`,
        data: {
            statusId: statusId,
            title: taskTitle,
            uniqueTitle: taskUniqueTitle
        }},
    )

    return (
        <TaskWrapper
            assignee={assignee}
            priority={taskPriority}
            taskDescription={taskDescription}
            taskId={taskId} boardId={boardId}
            onClick={onClick} attributes={attributes}
            listeners={listeners} ref={setNodeRef}
            taskTitle={taskTitle}
            taskUniqueTitle={taskUniqueTitle}
            className={classNames('', {}, [className])}
            editIsPossible={editIsPossible}/>
    )
};
