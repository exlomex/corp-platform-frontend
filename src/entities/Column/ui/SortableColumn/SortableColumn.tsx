import { classNames } from '@/shared/lib/classNames';
import cls from './SortableColumn.module.scss';
import {useSortable} from "@dnd-kit/sortable";
import {ReactElement, ReactNode} from "react";
import {DroppableColumn} from "../DroppableColumn/DroppableColumn.tsx";
import {StatusI} from "@/entities/Status";
import {Arguments} from "@dnd-kit/sortable/dist/hooks/useSortable";

interface SortableColumnProps {
    className?: string;
    children: ReactNode;
    boardStatus: StatusI
    createNewTask: (isHovered: boolean) => ReactElement;
    boardId: number
    editIsPossible: boolean;
    deleteIsPossible: boolean;
}

export const SortableColumn = (props: SortableColumnProps) => {
    const { className, boardStatus, createNewTask, children, boardId, editIsPossible, deleteIsPossible} = props;

    const {
        attributes,
        listeners,
        setNodeRef,
    } = useSortable({ id: `column-${boardStatus.id}`, data: {order: boardStatus.order, title: boardStatus.title} } as Arguments);

    return (
        <div
            className={classNames(cls.SortableColumn, {}, [className])}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <DroppableColumn
                statusId={boardStatus.id}
                columnTitle={boardStatus.title}
                createNewTask={createNewTask}
                order={boardStatus.order}
                boardId={boardId}
                editIsPossible={editIsPossible}
                deleteIsPossible={deleteIsPossible}
            >
                {children}
            </DroppableColumn>
        </div>
    )
};
