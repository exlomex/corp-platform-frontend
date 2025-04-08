import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsPage.module.scss';
import {MainLayout} from "@/shared/layouts/MainLayout";
import {AsideMenu} from "@/widgets/AsideMenu";
import {ProjectsContent} from "../ProjectsContent/ProjectsContent.tsx";

interface ProjectsPageProps {
    className?: string;
}

export function ProjectsPage(props: ProjectsPageProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.ProjectsPage, {}, [className])}>
            <MainLayout
                aside={<AsideMenu/>}
                content={<ProjectsContent/>}
            />
        </div>
    )
}

export default ProjectsPage