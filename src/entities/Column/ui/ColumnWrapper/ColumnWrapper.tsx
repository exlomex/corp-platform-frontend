import { classNames } from '@/shared/lib/classNames';
import cls from './ColumnWrapper.module.scss';
import {ForwardedRef, forwardRef, ReactNode} from "react";

interface ColumnWrapperProps {
    className?: string;
    children: ReactNode;
    columnTitle: string;
    isOver: boolean;
}

export const ColumnWrapper = forwardRef((props: ColumnWrapperProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, columnTitle, children, isOver } = props;
    return (
        <div ref={ref} className={classNames(cls.ColumnWrapper, {}, [className])}>
            <span className={cls.ColumnTitle}>{columnTitle}</span>

            <div className={cls.ColumnTasksCards}>
                {children}
            </div>

            {isOver && <span className={cls.OverLine}></span>}
        </div>
    )
});
