import { classNames } from '@/shared/lib/classNames';
import cls from './TasksPage.module.scss';
import {AsideMenu} from "@/widgets/AsideMenu";
import {MainLayout} from "@/shared/layouts/MainLayout";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {useNavigate} from "react-router";
import {getRouteBoards, getRouteProjects} from "@/shared/const/router.ts";
import {TasksPageContent} from "../TasksPageContent/TasksPageContent.tsx";

interface TasksPageProps {
    className?: string;
}

export function TasksPage(props: TasksPageProps) {
    const { className } = props;

    const selectedProject = useSelector(getProjectSelectedProject)
    const navigate = useNavigate()

    // useEffect(() => {
    //
    //     if (selectedProject === undefined) navigate(getRouteProjects())
    //
    //     if (selectedProject?.id) {
    //         navigate(getRouteBoards(String(selectedProject?.id)))
    //     } else {
    //         navigate(getRouteProjects())
    //     }
    // }, [navigate, selectedProject]);

    return (
        <div className={classNames(cls.TasksPage, {}, [className])}>
            <MainLayout
                aside={<AsideMenu/>}
                content={<TasksPageContent/>}
            />
        </div>
    )
}

export default TasksPage