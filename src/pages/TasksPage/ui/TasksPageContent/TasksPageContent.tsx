import { classNames } from '@/shared/lib/classNames';
import cls from './TasksPageContent.module.scss';
import {TaskTree} from "@/features/TaskTree";
import {TasksFilters} from "@/features/TasksFilters";
import {Typography} from "@/shared/ui/Typography";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {getProjectTreeTasks, SubTaskModal} from "@/entities/Task";
import {CreateExtendedTaskButton, CreateExtendedTaskModal} from "@/features/CreateNewTask";
import {TaskInfoModal} from "@/features/TaskInfo";
import {useTaskInfoModal} from "@/shared/hooks/useTaskInfoModal";
import {getUserInfo} from "@/entities/User/model/selectors/getUserValues.ts";
import {useIsMobile} from "@/shared/hooks/useIsMobile";
import {Helmet} from 'react-helmet'
import {Skeleton} from "@/shared/ui/Skeleton";

interface TasksPageContentProps {
    className?: string;
}

export const TasksPageContent = (props: TasksPageContentProps) => {
    const { className } = props;

    const selectedProject = useSelector(getProjectSelectedProject)

    const { isModalOpen, onClose } = useTaskInfoModal();

    const filteredTasks = useSelector(getProjectTreeTasks)

    const userInfo = useSelector(getUserInfo);
    const editIsPossible = userInfo?.allowedProjects.includes(selectedProject?.id)

    const {isMobile} = useIsMobile();

    const combinedTitle = selectedProject?.title ? `Задачи - ${selectedProject?.title}` : 'Задачи'

    return (
        <div className={classNames(cls.TasksPageContent, {}, [className])}>
            <Helmet>
                <title>{combinedTitle}</title>
            </Helmet>

            <div className={cls.TasksPageTopLine}>
                <div className={cls.HeadingWrapper}>
                    {selectedProject?.title ? (<Typography className={cls.Heading} size={'TEXT-26-MEDIUM'}>{selectedProject?.title}</Typography>) : <Skeleton border={6} height={36} width={140}/>}
                    <span className={cls.CountOfTasks}>{filteredTasks?.length || 0}</span>
                </div>
                {editIsPossible && !isMobile && <CreateExtendedTaskButton/>}
            </div>
            <TasksFilters/>
            <TaskTree/>

            {/* AddSubTaskModal */}
            <SubTaskModal/>

            {/* AddTaskModal */}
            <CreateExtendedTaskModal/>

            {/* TaskInfoModal */}
            {<TaskInfoModal isOpen={isModalOpen} onClose={onClose}/>}
        </div>
    )
};
