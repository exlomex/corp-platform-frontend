import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsContent.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {Table} from "@/shared/ui/Table";
import {Column} from "@/shared/ui/Table/Table.tsx";
import {ProjectsTable} from "@/features/ProjectsTable";
import {memo} from "react";
import {Modal} from "@/shared/ui/Modal";
import {Button} from "@/shared/ui/Button";
import {newProjectSliceActions} from "@/features/CreateNewProject";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {useSelector} from "react-redux";
import {
    getIsFirstFetchUserProject,
    getProjectFetchUserProjectIsLoading,
    getProjectUserProjects
} from "@/entities/Project";
import {BoardsTable} from "@/features/BoardsTable";
import NoDataIllustration from '@/shared/assets/illustations/noDataIllustration.svg'
import {EditProjectTitleModal} from "@/features/EditProjectTitle";
import {Helmet} from "react-helmet";

interface ProjectsContentProps {
    className?: string;
}

export const ProjectsContent = memo((props: ProjectsContentProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const onNewProjectButtonClick = () => {
        dispatch(newProjectSliceActions.setCreateProjectModalOpen(true))
    }

    const userProjects = useSelector(getProjectUserProjects)
    const projectsIsFirstLoading = useSelector(getIsFirstFetchUserProject)
    const projectsIsLoading = useSelector(getProjectFetchUserProjectIsLoading)

    return (
        <div className={classNames(cls.ProjectsContent, {}, [className])}>
            <Helmet>
                <title>{`Проекты`}</title>
            </Helmet>

            <div className={cls.ProjectsTopLine}>
                <Typography className={cls.Heading} size={'TEXT-20-MEDIUM'}>Проекты</Typography>
                <Button onClick={onNewProjectButtonClick} buttonType={'SMART_TEXT_BTN_FILLED'}>Создать проект</Button>
            </div>

            {projectsIsFirstLoading || projectsIsLoading
                ? <ProjectsTable noData/>
                : (userProjects.length
                        ? <ProjectsTable/>
                        : <div className={cls.NoDataContainer}>
                            <div className={cls.NoData}>
                                <NoDataIllustration/>
                                <Typography size={'PARAGRAPH-18-REGULAR'}>Проекты не найдены</Typography>
                            </div>
                        </div>
                )
            }

            {/*  Edit project title modal  */}
            <EditProjectTitleModal/>
        </div>
    )
});
