import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsTab.module.scss';
import {Popover} from "@/shared/ui/popups";
import {ProjectsTabButton} from "../ProjectsTabButton/ProjectsTabButton.tsx";
import {useSelector} from "react-redux";
import {getIsFirstFetchUserProject, getProjectUserProjects, ProjectActions} from "@/entities/Project";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {cloneElement, useEffect} from "react";
import {FetchUserProjects} from "@/entities/Project/model/services/fetchUserProjects.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {Button} from "@/shared/ui/Button";
import {useTheme} from "@/shared/hooks/useTheme";
import ProjectIcon from '@/shared/assets/icons/projects.svg'
import AddIcon from '@/shared/assets/icons/addIcon.svg'
import {newProjectSliceActions} from "@/features/CreateNewProject";
import {SelectedProjectInterface} from "@/entities/Project/model/types/projectSliceSchema.ts";
import {LOCAL_STORAGE_SELECTED_PROJECT} from "@/shared/const/localstorage.ts";
import {PopoverButton, PopoverPanel} from "@headlessui/react";
import {AnchorProps} from "@/shared/types/popups.ts";

interface ProjectsTabProps {
    className?: string;
}

export const ProjectsTab = (props: ProjectsTabProps) => {
    const { className } = props;

    const userProjects = useSelector(getProjectUserProjects)

    const dispatch = useAppDispatch()
    const isFirstCallFetchUserProjects = useSelector(getIsFirstFetchUserProject)

    useEffect(() => {
        if (!userProjects && isFirstCallFetchUserProjects) {
            dispatch(FetchUserProjects())
        }
    }, [dispatch, isFirstCallFetchUserProjects, userProjects]);

    useEffect(() => {
        if (userProjects && userProjects.length) dispatch(ProjectActions.initProjects())
    }, [dispatch, userProjects]);

    const selectedProject = useSelector(getProjectSelectedProject)

    const {theme} = useTheme()

    const onNewProjectButtonClick = () => {
        dispatch(newProjectSliceActions.setCreateProjectModalOpen(true))
    }

    const onSelectNewProject = (project: SelectedProjectInterface, close: () => void) => () => {
        dispatch(ProjectActions.setSelectedProject(project))
        localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT, JSON.stringify(project))
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
                    className={classNames(cls.ProjectsWrapper, {}, [theme === 'light_theme' ? 'light_theme' : 'dark_theme'])}>
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
                            <p>Проекты не найдены</p>
                        )}

                        <Button onClick={onNewProjectButtonClick} buttonType={'CREATE_WITH_ICON_BTN_FILLED'}><AddIcon/>Создать
                            проект</Button>
                    </div>
                </div>
            )}
        </Popover>
    )
};
