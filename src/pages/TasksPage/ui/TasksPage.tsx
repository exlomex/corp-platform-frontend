import { classNames } from '@/shared/lib/classNames';
import cls from './TasksPage.module.scss';
import {AsideMenu} from "@/widgets/AsideMenu";

interface TasksPageProps {
    className?: string;
}

export function TasksPage(props: TasksPageProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.TasksPage, {}, [className])}>
            <AsideMenu/>
        </div>
    )
}

export default TasksPage