import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectBoardPage.module.scss';
import {AsideMenu} from "@/widgets/AsideMenu";
import {MainLayout} from "@/shared/layouts/MainLayout";
import {ProjectBoardContent} from "../ProjectBoardContent/ProjectBoardContent.tsx";
import {useIsMobile} from "@/shared/hooks/useIsMobile";
import {MobileMenu} from "@/widgets/MobileMenu/MobileMenu.tsx";

interface ProjectBoardPageProps {
    className?: string;
}

export function ProjectBoardPage(props: ProjectBoardPageProps) {
    const { className } = props;

    const {isMobile} = useIsMobile()

    if (isMobile) {
        return (
            <div className={classNames(cls.ProjectBoardPage, {[cls.IsMobile]: isMobile}, [className])}>
                <MainLayout
                    mobileMenu={<MobileMenu/>}
                    content={<ProjectBoardContent/>}
                />
            </div>
        )
    }

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