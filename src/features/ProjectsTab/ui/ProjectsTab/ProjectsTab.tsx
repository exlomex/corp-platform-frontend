import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsTab.module.scss';
import {Popover} from "@/shared/ui/popups";
import {ProjectsTabButton} from "../ProjectsTabButton/ProjectsTabButton.tsx";
import {useSelector} from "react-redux";
import {
    getIsFirstFetchUserProject,
    getProjectFetchUserProjectIsLoading,
    getProjectUserProjects,
    ProjectActions
} from "@/entities/Project";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {useEffect} from "react";
import {FetchUserProjects} from "@/entities/Project/model/services/fetchUserProjects.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {Button} from "@/shared/ui/Button";
import {useTheme} from "@/shared/hooks/useTheme";
import ProjectIcon from '@/shared/assets/icons/projects.svg'
import AddIcon from '@/shared/assets/icons/addIcon.svg'
import {newProjectSliceActions} from "@/features/CreateNewProject";
import {SelectedProjectInterface} from "@/entities/Project/model/types/projectSliceSchema.ts";
import {LOCAL_STORAGE_SELECTED_PROJECT} from "@/shared/const/localstorage.ts";
import {Typography} from "@/shared/ui/Typography";
import {useLocation, useNavigate, useParams} from "react-router";
import {getUserBoardsBySelectedProject} from "@/entities/Board";
import {getRouteProjectBoard} from "@/shared/const/router.ts";
import {FetchUserBoardsByProjectId} from "@/entities/Board/model/services/fetchUserBoardsByProjectId.ts";

interface ProjectsTabProps {
    className?: string;
}

export const ProjectsTab = (props: ProjectsTabProps) => {
    const { className } = props;

    const userProjects = useSelector(getProjectUserProjects)

    const dispatch = useAppDispatch()
    const isFirstCallFetchUserProjects = useSelector(getIsFirstFetchUserProject)
    const isFetchingUserProjects = useSelector(getProjectFetchUserProjectIsLoading)

    useEffect(() => {
        if (!userProjects && isFirstCallFetchUserProjects) {
            dispatch(FetchUserProjects())
        }
    }, [dispatch, isFirstCallFetchUserProjects, userProjects]);

    // useEffect(() => {
    //     if (userProjects && userProjects.length) dispatch(ProjectActions.initProjects())
    //     if (!userProjects
    //         && !isFirstCallFetchUserProjects
    //         && JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT))
    //         && !isFetchingUserProjects) {
    //         localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT)
    //     }
    // }, [dispatch, isFetchingUserProjects, isFirstCallFetchUserProjects, userProjects]);

    const selectedProject = useSelector(getProjectSelectedProject)

    const {theme} = useTheme()

    const onNewProjectButtonClick = () => {
        dispatch(newProjectSliceActions.setCreateProjectModalOpen(true))
    }

    const params = useParams()
    const navigate = useNavigate()
    const onSelectNewProject = (project: SelectedProjectInterface, close: () => void) => async () => {
        dispatch(ProjectActions.setSelectedProject(project))
        localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT, JSON.stringify(project))

        if (params.project !== project.title) {
            try {
                const responce = await dispatch(FetchUserBoardsByProjectId({projectId: project.id})).unwrap()
                if (responce.length >= 1) {
                    navigate(getRouteProjectBoard(project.title, String(responce[0].id)))
                }

            } catch (e) {
                throw new Error(e.message || e)
            }
        }

        close()
    }

    return (
        <Popover
            className={classNames(cls.ProjectsTab, {}, [className])}
            trigger={<ProjectsTabButton selectedProject={selectedProject && selectedProject.title}/>}
            direction={'right start'}
        >
            {({open, close}) => (
                <div
                    className={classNames(cls.ProjectsWrapper, {}, [theme === 'light_theme' ? 'dark_theme' : 'light_theme'])}>
                    <p className={cls.ProjectsHeader}>Ваши проекты</p>

                    <div className={cls.ProjectsList}>
                        {userProjects && userProjects.length ? (
                            userProjects.map(project => (
                                <div
                                    onClick={onSelectNewProject({id: project.id, title: project.title}, close)}
                                    key={project.id}
                                    className={classNames(cls.ProjectItem, {[cls.ProjectActive]: selectedProject && selectedProject.title === project.title}, [])}>
                                    <span className={cls.ProjectIcon}><ProjectIcon/></span>

                                    <p>{project.title}</p>
                                </div>
                            ))
                        ) : (
                            <Typography size={'PARAGRAPH-14-REGULAR'} className={cls.NotFoundedTitle}>Проекты не найдены</Typography>
                        )}

                        <Button onClick={onNewProjectButtonClick} buttonType={'CREATE_WITH_ICON_BTN_FILLED'}><AddIcon/>Создать
                            проект</Button>
                    </div>
                </div>
            )}
        </Popover>
    )
};
