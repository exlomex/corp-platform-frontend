import { classNames } from '@/shared/lib/classNames';
import cls from './TaskWrapper.module.scss';
import {ForwardedRef, forwardRef} from "react";
import {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";
import {DraggableAttributes} from "@dnd-kit/core";

interface TaskWrapperProps {
    className?: string;
    taskTitle: string;
    taskUniqueTitle: string;
    listeners?: SyntheticListenerMap;
    attributes?: DraggableAttributes;
    onClick?: () => void;
}

export const TaskWrapper = forwardRef((props: TaskWrapperProps, ref: ForwardedRef<HTMLDivElement> ) => {
    const { className, taskTitle, taskUniqueTitle, attributes,listeners, onClick } = props;
    return (
        <div {...attributes} {...listeners} onClick={onClick} ref={ref} className={classNames(cls.TaskWrapper, {}, [className])}>
            <div>
                <span>{taskTitle}</span>
            </div>

            <div>
                <span className={cls.TaskUniqueTitle}>{taskUniqueTitle}</span>
            </div>
        </div>
    )
});
