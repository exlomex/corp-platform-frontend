import { classNames } from '@/shared/lib/classNames';
import cls from './TasksPage.module.scss';
import {AsideMenu} from "@/widgets/AsideMenu";
import {MainLayout} from "@/shared/layouts/MainLayout";

interface TasksPageProps {
    className?: string;
}

export function TasksPage(props: TasksPageProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.TasksPage, {}, [className])}>
            <MainLayout
                aside={<AsideMenu/>}
                content={<div>123</div>}
            />
        </div>
    )
}

export default TasksPage