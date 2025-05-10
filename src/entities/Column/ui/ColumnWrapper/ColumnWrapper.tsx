import { classNames } from '@/shared/lib/classNames';
import cls from './ColumnWrapper.module.scss';
import {ForwardedRef, forwardRef, ReactElement, ReactNode, useState} from "react";
import {AdditionalColumnOptions} from "../AdditionalColumnOptions/AdditionalColumnOptions.tsx";

interface ColumnWrapperProps {
    className?: string;
    children?: ReactNode;
    columnTitle: string;
    isOver?: boolean;
    isOverColumn?: boolean;
    createNewTask?: (isHovered: boolean) => ReactElement;
    statusId: number;
    boardId: number;
}

export const ColumnWrapper = forwardRef((props: ColumnWrapperProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, columnTitle, children, isOver, createNewTask, isOverColumn, statusId, boardId } = props;

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isTopLineHover, setIsTopLineHover] = useState<boolean>(false)

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={ref}
            className={classNames(cls.ColumnWrapper, {}, [className])}
        >
            {isOverColumn && <span className={cls.ColumnOverLine}></span>}

            <div
                className={cls.ColumnTopLine}
                onMouseEnter={() => setIsTopLineHover(true)}
                onMouseLeave={() => setIsTopLineHover(false)}
            >
                <span className={cls.ColumnTitle}>{columnTitle}</span>

                <AdditionalColumnOptions boardId={boardId} isHover={isTopLineHover} statusId={statusId}/>
            </div>

            {isOver && <span className={cls.OverLine}></span>}

            <div className={classNames(cls.ColumnTasksCards, {}, [])}>
                {children && children}
            </div>

            {createNewTask && createNewTask(isHovered)}
        </div>
    )
});
