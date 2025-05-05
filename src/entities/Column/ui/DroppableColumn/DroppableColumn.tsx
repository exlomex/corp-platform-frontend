import { classNames } from '@/shared/lib/classNames';
import {ColumnWrapper} from "../ColumnWrapper/ColumnWrapper.tsx";
import {ReactElement, ReactNode} from "react";
import {useDroppable} from "@dnd-kit/core";

interface DroppableColumnProps {
    className?: string;
    children: ReactNode;
    columnTitle: string;
    statusId: number;
}

export const DroppableColumn = (props: DroppableColumnProps) => {
    const { className, children, columnTitle, statusId} = props;

    const {setNodeRef, isOver, active, over} = useDroppable({id: statusId})

    const isCorrectlyOver = active?.data?.current?.statusId !== over?.id ? isOver : false

    return (
        <ColumnWrapper
            ref={setNodeRef}
            columnTitle={columnTitle}
            isOver={isCorrectlyOver}
            className={classNames('', {}, [className])}>
            {children}
        </ColumnWrapper>
    )
};
