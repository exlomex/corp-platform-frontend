import { classNames } from '@/shared/lib/classNames';
import cls from './TasksPage.module.scss';
import {AsideMenu} from "@/widgets/AsideMenu";
import {MainLayout} from "@/shared/layouts/MainLayout";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {useNavigate} from "react-router";
import {TasksPageContent} from "../TasksPageContent/TasksPageContent.tsx";
import {MobileMenu} from "@/widgets/MobileMenu/MobileMenu.tsx";
import {useIsMobile} from "@/shared/hooks/useIsMobile";

interface TasksPageProps {
    className?: string;
}

export function TasksPage(props: TasksPageProps) {
    const { className } = props;

    // const selectedProject = useSelector(getProjectSelectedProject)
    // const navigate = useNavigate()

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

    const {isMobile} = useIsMobile()

    if (isMobile) {
        return (
            <div className={classNames(cls.TasksPage, {[cls.IsMobile]: isMobile}, [className])}>
                <MainLayout
                    mobileMenu={<MobileMenu/>}
                    content={<TasksPageContent/>}
                />
            </div>
        )
    }

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