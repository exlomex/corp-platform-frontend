import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsTab.module.scss';
import {Popover} from "@/shared/ui/popups";
import {ProjectsTabButton} from "../ProjectsTabButton/ProjectsTabButton.tsx";
import {useSelector} from "react-redux";
import {
    getIsFirstFetchUserProject,
    getProjectFetchUserProjectIsLoading,
    getProjectUserProjects,
    ProjectActions, selectNewProject
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
import {getIsUserBoardsFetching, getUserBoardsBySelectedProject} from "@/entities/Board";
import {getRouteProjectBoard, getRouteProjects} from "@/shared/const/router.ts";
import {FetchUserBoardsByProjectId} from "@/entities/Board/model/services/fetchUserBoardsByProjectId.ts";
import {Skeleton} from "@/shared/ui/Skeleton";

interface ProjectsTabProps {
    className?: string;
    isCollapsed?: boolean
    isMobile?: boolean
}

export const ProjectsTab = (props: ProjectsTabProps) => {
    const { className, isCollapsed = false, isMobile = false} = props;

    const userProjects = useSelector(getProjectUserProjects)

    const dispatch = useAppDispatch()
    const isFirstCallFetchUserProjects = useSelector(getIsFirstFetchUserProject)
    const isFetchingUserProjects = useSelector(getProjectFetchUserProjectIsLoading)

    const params = useParams() as Params
    const navigate = useNavigate()

    useEffect(() => {
        if (!userProjects && isFirstCallFetchUserProjects) {
            dispatch(FetchUserProjects())
        }
    }, [dispatch, isFirstCallFetchUserProjects, userProjects]);

    useEffect(() => {
        if (userProjects !== undefined && userProjects.length === 0) {
            navigate(getRouteProjects())
        }
    }, [navigate, userProjects]);

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

    interface Params {
        project?: string;
        board?: string;
    }


    return (
        <Popover
            popoverPanelClassName={isMobile ? cls.ProjectsPopoverPanel : ''}
            className={classNames(cls.ProjectsTab, {}, [className])}
            trigger={<ProjectsTabButton
                isCollapsed={isCollapsed}
                selectedProject={selectedProject && (isCollapsed ? selectedProject.projectKey : selectedProject.title)}
            />}
            direction={isMobile ? 'bottom' : 'right start'}
        >
            {({open, close}) => (
                <div
                    className={classNames(cls.ProjectsWrapper, {[cls.MobileWrapper]: isMobile}, [theme === 'light_theme' ? 'dark_theme' : 'light_theme'])}>
                    <p className={cls.ProjectsHeader}>Ваши проекты</p>

                    <div className={cls.ProjectsList}>
                        {isFetchingUserProjects
                            ? <div
                                className={classNames(cls.ProjectItem, {}, [cls.NonSelectable])}
                            >
                                <Skeleton width={25} height={25} border={6}/>
                                <Skeleton width={'calc(100% - 25px - 15px)'} height={25} border={6}/>
                            </div>
                            : userProjects && userProjects.length
                                ? (
                                    userProjects.map(project => (
                                        <div
                                            onClick={async () => {
                                                await selectNewProject(
                                                    {id: project.id, title: project.title, projectKey: project.shortName, ownerId: project.ownerId},
                                                    dispatch,
                                                    navigate,
                                                    params,
                                                    close
                                                );
                                            }}
                                            key={project.id}
                                            className={classNames(cls.ProjectItem, {[cls.ProjectActive]: selectedProject && selectedProject.title === project.title}, [])}>
                                            <span className={cls.ProjectIcon}><ProjectIcon/></span>

                                            <p className={cls.ProjectItemTitle}>{project.title}</p>
                                        </div>
                                    ))
                                ) : (<Typography size={'PARAGRAPH-14-REGULAR'} className={cls.NotFoundedTitle}>Проекты не найдены</Typography>)}

                        <Button onClick={onNewProjectButtonClick} buttonType={'CREATE_WITH_ICON_BTN_FILLED'}><AddIcon/>Создать
                            проект</Button>
                    </div>
                </div>
            )}
        </Popover>
    )
};
