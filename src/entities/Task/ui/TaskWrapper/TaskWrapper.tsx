import { classNames } from '@/shared/lib/classNames';
import cls from './TaskWrapper.module.scss';
import {ForwardedRef, forwardRef, useState} from "react";
import {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";
import {DraggableAttributes} from "@dnd-kit/core";
import {AdditionalTaskOptions} from "../AdditionalTaskOptions/AdditionalTaskOptions.tsx";
import {EditableTaskTitle} from "../EditableTaskTitle/EditableTaskTitle.tsx";
import {Priority, priorityIconMap} from "@/features/CreateNewTask/const/priorityConsts.tsx";
import {Tooltip} from "@/shared/ui/Tooltip";
import {TaskUser} from "@/entities/Task/model/types/taskSliceSchema.ts";
import AvatarIcon from '@/shared/assets/icons/userAvatarIcon.svg'

interface TaskWrapperProps {
    className?: string;
    taskTitle: string;
    taskUniqueTitle: string;
    listeners?: SyntheticListenerMap;
    attributes?: DraggableAttributes;
    onClick?: () => void;
    taskId: number;
    boardId: number;
    taskDescription: string | null;
    priority?: Priority
    assignee?: TaskUser
}

export const TaskWrapper = forwardRef((props: TaskWrapperProps, ref: ForwardedRef<HTMLDivElement> ) => {
    const { assignee, className, taskTitle, taskUniqueTitle, attributes,listeners, onClick, taskId, boardId, taskDescription, priority} = props;

    const [isTaskHover, setIsTaskHover] = useState<boolean>(false);
    const [isEditTitleActive, setIsEditTitleActive] = useState<boolean>(false)

    return (
        <div
            onMouseEnter={() => setIsTaskHover(true)}
            onMouseLeave={() => setIsTaskHover(false)}
            {...attributes}
            {...listeners}
            onClick={onClick}
            ref={ref}
            className={classNames(cls.TaskWrapper, {[cls.taskEditActive]: isEditTitleActive}, [className])}>

            <div className={cls.TaskTopLine}>
                <EditableTaskTitle isEditTitleActive={isEditTitleActive} setIsEditTitleActive={setIsEditTitleActive} taskDescription={taskDescription} taskId={taskId} boardId={boardId} isHover={isTaskHover} taskTitle={taskTitle}/>

                <AdditionalTaskOptions taskId={taskId} uniqueTaskTitle={taskUniqueTitle} isHover={isTaskHover}/>
            </div>

            <div className={cls.TaskBottomLine}>
                <span className={cls.TaskUniqueTitle}>{taskUniqueTitle}</span>
                <div className={cls.TaskBottomLineRightSide}>
                    {priority && <Tooltip text={`Приоритет: ${priority}`}>
                        <span className={cls.Priority}>{priorityIconMap[priority]}</span>
                    </Tooltip>}
                    {assignee && <Tooltip text={`Исполнитель: ${assignee.firstName} ${assignee.lastName}`}>
                        {assignee.imageUrl
                            ? <img className={cls.AvatarIcon} src={assignee.imageUrl} alt="assignee"/>
                            : <div className={cls.AvatarIcon}><AvatarIcon/></div>
                        }
                    </Tooltip>}
                </div>
            </div>
        </div>
    )
});
