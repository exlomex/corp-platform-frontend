import { classNames } from '@/shared/lib/classNames';
import cls from './TasksPageContent.module.scss';
import {TaskTree} from "@/features/TaskTree";
import {TasksFilters} from "@/features/TasksFilters";
import {Typography} from "@/shared/ui/Typography";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {Calendar} from "@/shared/ui/Calendar";
import {useState} from "react";
import {SubTaskModal} from "@/entities/Task";
import {CreateExtendedTaskButton, CreateExtendedTaskModal} from "@/features/CreateNewTask";
import {TaskInfoModal} from "@/features/TaskInfo";
import {useTaskInfoModal} from "@/shared/hooks/useTaskInfoModal";

interface TasksPageContentProps {
    className?: string;
}

export const TasksPageContent = (props: TasksPageContentProps) => {
    const { className } = props;

    const selectedProject = useSelector(getProjectSelectedProject)

    const { isModalOpen, onClose } = useTaskInfoModal();

    return (
        <div className={classNames(cls.TasksPageContent, {}, [className])}>
            <div className={cls.TasksPageTopLine}>
                <Typography className={cls.Heading} size={'TEXT-26-MEDIUM'}>{selectedProject?.title}</Typography>
                <CreateExtendedTaskButton/>
            </div>
            <TasksFilters/>
            <TaskTree/>

            {/* AddSubTaskModal */}
            <SubTaskModal/>

            {/* AddTaskModal */}
            <CreateExtendedTaskModal/>

            {/* TaskInfoModal */}
            {<TaskInfoModal isOpen={isModalOpen} onClose={onClose}/>}
        </div>
    )
};
