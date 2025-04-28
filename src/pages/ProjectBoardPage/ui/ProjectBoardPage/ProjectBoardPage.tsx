import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectBoardPage.module.scss';
import {AsideMenu} from "@/widgets/AsideMenu";
import {MainLayout} from "@/shared/layouts/MainLayout";
import {ProjectBoardContent} from "../ProjectBoardContent/ProjectBoardContent.tsx";

interface ProjectBoardPageProps {
    className?: string;
}

export function ProjectBoardPage(props: ProjectBoardPageProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.ProjectBoardPage, {}, [className])}>
            <MainLayout
                aside={<AsideMenu/>}
                content={<ProjectBoardContent/>}
            />
        </div>
    )
}

export default ProjectBoardPage