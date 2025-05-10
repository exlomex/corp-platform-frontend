import { classNames } from '@/shared/lib/classNames';
import {ColumnWrapper} from "../ColumnWrapper/ColumnWrapper.tsx";
import {ReactElement, ReactNode} from "react";
import {useDroppable} from "@dnd-kit/core";

interface DroppableColumnProps {
    className?: string;
    children: ReactNode;
    columnTitle: string;
    statusId: number;
    order: number;
    createNewTask: (isHovered: boolean) => ReactElement;
    boardId: number;
}

export const DroppableColumn = (props: DroppableColumnProps) => {
    const { className, children, columnTitle, statusId, createNewTask, order, boardId} = props;

    const {setNodeRef, isOver, active, over} = useDroppable({id: statusId, data: {order: order}})

    const isCorrectlyOver = active?.data?.current?.statusId !== over?.id && String(active.id).startsWith('task-') ? isOver : false

    const isOverColumn = active?.data?.current?.statusId !== over?.id && String(active.id).startsWith('column-') ? isOver : false

    return (
        <ColumnWrapper
            ref={setNodeRef}
            columnTitle={columnTitle}
            isOver={isCorrectlyOver}
            isOverColumn={isOverColumn}
            className={classNames('', {}, [className])}
            createNewTask={createNewTask}
            statusId={statusId}
            boardId={boardId}
        >
            {children}
        </ColumnWrapper>
    )
};
