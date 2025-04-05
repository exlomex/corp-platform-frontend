import { classNames } from '@/shared/lib/classNames';
import cls from './AsideMenu.module.scss';
import LightLogo from '@/shared/assets/logo/light_full_logo.svg'
import LightLogoCropped from '@/shared/assets/logo/cropped_logo.svg'
import {ReactElement, useState} from "react";
import TaskIcon from '@/shared/assets/icons/tasks.svg'
import AgileBoardIcon from '@/shared/assets/icons/agileTasks.svg'
import ProjectsIcon from '@/shared/assets/icons/projects.svg'
import MessagesIcon from '@/shared/assets/icons/messages.svg'
import CollapseIcon from '@/shared/assets/icons/collapse.svg'
import {LOCAL_STORAGE_COLLAPSED_KEY} from "@/shared/const/localstorage.ts";

interface AsideMenuProps {
    className?: string;
}

export const AsideMenu = (props: AsideMenuProps) => {
    const { className } = props;

    const navigationItems: {icon: ReactElement, content: string}[] = [
        {
            icon: <TaskIcon/>,
            content: 'Задачи'
        },
        {
            icon: <AgileBoardIcon/>,
            content: 'Agile доски'
        },
        {
            icon: <ProjectsIcon/>,
            content: 'Проекты'
        },
        {
            icon: <MessagesIcon/>,
            content: 'Сообщения'
        },
    ]

    const initialCollapsedFlag: boolean = localStorage.getItem(LOCAL_STORAGE_COLLAPSED_KEY) === 'true'
    const [collapsed, setCollapsed] = useState<boolean>(initialCollapsedFlag)

    const onClickCollapsedButton = () => {
        setCollapsed(!collapsed)
        localStorage.setItem(LOCAL_STORAGE_COLLAPSED_KEY, String(!collapsed))
    }

    return (
        <div className={classNames(cls.AsideMenu, {[cls.AsideCollapsed]: collapsed}, [className])}>
            <div className={cls.AsideTopContainer}>
                {!collapsed ? <LightLogo className={cls.AsideLogo}/> : <LightLogoCropped className={cls.AsideLogo}/>}

                <nav className={cls.Navigation}>
                    {navigationItems.map((navigationItem, index) => (
                        <div key={index} className={cls.AsideItem}>
                            <span className={cls.IconWrapper}>{navigationItem.icon}</span>
                            <span className={cls.AsideContent}>{navigationItem.content}</span>
                        </div>
                    ))}
                </nav>
            </div>

            <div>
                <div
                    className={cls.AsideItem}
                    onClick={onClickCollapsedButton}
                >
                    <span className={classNames(cls.IconWrapper, {[cls.Collapsed]: collapsed}, [])}><CollapseIcon/></span>
                    <span className={cls.AsideContent}>Свернуть</span>
                </div>
            </div>
        </div>
    )
};
