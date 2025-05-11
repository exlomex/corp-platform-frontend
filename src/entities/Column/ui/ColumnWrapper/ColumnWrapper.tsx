import { classNames } from '@/shared/lib/classNames';
import cls from './ColumnWrapper.module.scss';
import {ForwardedRef, forwardRef, ReactElement, ReactNode, useState} from "react";
import {AdditionalColumnOptions} from "../AdditionalColumnOptions/AdditionalColumnOptions.tsx";
import {EditableColumnTitle} from "@/entities/Column/ui/EditableColumnTitle/EditableColumnTitle.tsx";

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

    const [isEditDescriptionActive, setIsEditDescriptionActive] = useState<boolean>(false)

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
                <EditableColumnTitle columnTitle={columnTitle} columnId={statusId} boardId={boardId} isEditDescriptionActive={isEditDescriptionActive} setIsEditDescriptionActive={setIsEditDescriptionActive}/>

                {!isEditDescriptionActive && <AdditionalColumnOptions boardId={boardId} isHover={isTopLineHover} statusId={statusId}/>}
            </div>
            <span className={classNames(cls.OverLine, {[cls.isOver]: isOver}, [])}></span>

            <div className={classNames(cls.ColumnTasksCards, {}, [])}>
                {children && children}
            </div>

            {createNewTask && createNewTask(isHovered)}
        </div>
    )
});
