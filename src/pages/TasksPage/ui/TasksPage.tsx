import { classNames } from '@/shared/lib/classNames';
import cls from './TasksPage.module.scss';
import {AsideMenu} from "@/widgets/AsideMenu";
import {MainLayout} from "@/shared/layouts/MainLayout";
import {ComboBox} from "@/shared/ui/ComboBox";
import {Select} from "@/shared/ui/Select";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {useNavigate} from "react-router";
import {getRouteBoards, getRouteProjects} from "@/shared/const/router.ts";

interface TasksPageProps {
    className?: string;
}


const Content = () => {

    return <></>
}

export function TasksPage(props: TasksPageProps) {
    const { className } = props;

    const selectedProject = useSelector(getProjectSelectedProject)
    const navigate = useNavigate()

    useEffect(() => {

        if (selectedProject === undefined) navigate(getRouteProjects())

        if (selectedProject?.id) {
            navigate(getRouteBoards(String(selectedProject?.id)))
        } else {
            navigate(getRouteProjects())
        }
    }, [navigate, selectedProject]);

    return (
        <div className={classNames(cls.TasksPage, {}, [className])}>
            <MainLayout
                aside={<AsideMenu/>}
                content={<Content/>}
            />
        </div>
    )
}

export default TasksPage