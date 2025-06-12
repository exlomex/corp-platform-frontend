import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsPage.module.scss';
import {MainLayout} from "@/shared/layouts/MainLayout";
import {AsideMenu} from "@/widgets/AsideMenu";
import {ProjectsContent} from "../ProjectsContent/ProjectsContent.tsx";
import {useIsMobile} from "@/shared/hooks/useIsMobile";
import {MobileMenu} from "@/widgets/MobileMenu/MobileMenu.tsx";

interface ProjectsPageProps {
    className?: string;
}

export function ProjectsPage(props: ProjectsPageProps) {
    const { className } = props;

    const {isMobile} = useIsMobile()

    if (isMobile) {
        return (
            <div className={classNames(cls.ProjectsPage, {[cls.IsMobile]: isMobile}, [className])}>
                <MainLayout
                    mobileMenu={<MobileMenu/>}
                    content={<ProjectsContent/>}
                />
            </div>
        )
    }

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