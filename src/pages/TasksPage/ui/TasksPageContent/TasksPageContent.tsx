import { classNames } from '@/shared/lib/classNames';
import cls from './TasksPageContent.module.scss';
import {TaskTree} from "@/features/TaskTree";
import {TasksFilters} from "@/features/TasksFilters";
import {Typography} from "@/shared/ui/Typography";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {Calendar} from "@/shared/ui/Calendar";
import {useState} from "react";

interface TasksPageContentProps {
    className?: string;
}

export const TasksPageContent = (props: TasksPageContentProps) => {
    const { className } = props;

    const selectedProject = useSelector(getProjectSelectedProject)

    return (
        <div className={classNames(cls.TasksPageContent, {}, [className])}>
            <Typography className={cls.Heading} size={'TEXT-26-MEDIUM'}>{selectedProject?.title}</Typography>
            <TasksFilters/>
            <TaskTree/>
        </div>
    )
};
