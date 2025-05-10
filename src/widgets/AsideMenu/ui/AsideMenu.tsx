import { classNames } from '@/shared/lib/classNames';
import cls from './AsideMenu.module.scss';
import LightLogo from '@/shared/assets/logo/light_full_logo.svg'
import LightLogoCropped from '@/shared/assets/logo/cropped_logo.svg'
import {memo, ReactElement, useRef, useState} from "react";
import TaskIcon from '@/shared/assets/icons/tasks.svg'
import ProjectsIcon from '@/shared/assets/icons/projects.svg'
import MessagesIcon from '@/shared/assets/icons/messages.svg'
import CollapseIcon from '@/shared/assets/icons/collapse.svg'
import {LOCAL_STORAGE_COLLAPSED_KEY} from "@/shared/const/localstorage.ts";
import {ProfileTab} from "@/features/ProfileTab";
import {Link, useLocation} from "react-router";
import {getRouteMain, getRouteProjects} from "@/shared/const/router.ts";
import {ProjectsTab} from "@/features/ProjectsTab";
import {BoardTabContent} from "@/features/BoadsTab";

interface AsideMenuProps {
    className?: string;
}

type navTabContentValues = 'Задачи' | 'Agile доски' | 'Проекты' | 'Сообщения'

type defaultNavItem = {
    icon: ReactElement;
    content: navTabContentValues;
    href?: string;
}

type JSXNavElement = {
    element: ReactElement;
    // for find index func
    content: navTabContentValues;
}

type navItemType = defaultNavItem | JSXNavElement
export const AsideMenu = memo((props: AsideMenuProps) => {
    const { className } = props;

    const navigationItems: navItemType[] = [
        {
            icon: <TaskIcon/>,
            content: 'Задачи'
        },
        {
            element: <BoardTabContent/>,
            content: 'Agile доски'
        },
        {
            icon: <ProjectsIcon/>,
            content: 'Проекты',
            href: getRouteProjects()
        },
        {
            icon: <MessagesIcon/>,
            content: 'Сообщения',
        }
    ]

    const initialCollapsedFlag: boolean = localStorage.getItem(LOCAL_STORAGE_COLLAPSED_KEY) === 'true'
    const [collapsed, setCollapsed] = useState<boolean>(initialCollapsedFlag)

    const onClickCollapsedButton = () => {
        setCollapsed(!collapsed)
        localStorage.setItem(LOCAL_STORAGE_COLLAPSED_KEY, String(!collapsed))
    }

    const location = useLocation()

    const asideTabsMapper: Record<string, navTabContentValues> = {
        'projects': 'Проекты',
        'agileBoards': 'Agile доски',
        'tasks': 'Задачи',
        'messages': 'Сообщения'
    }

    const pathname = location.pathname.replace('/', '');
    const activeIndex = useRef<number>(navigationItems.findIndex(item => item.content === asideTabsMapper[pathname]))

    return (
        <div className={classNames(cls.AsideMenu, {[cls.AsideCollapsed]: collapsed}, [className])}>
            <div className={cls.AsideTopContainer}>
                <Link className={cls.AsideLogoLink} to={getRouteMain()}>{!collapsed ? <LightLogo className={cls.AsideLogo}/> : <LightLogoCropped className={cls.AsideLogo}/>}</Link>

                <ProjectsTab className={cls.ProjectTab}/>

                <nav className={cls.Navigation}>
                    {navigationItems.map((navigationItem, index) => {
                            return (
                                !('element' in navigationItem) ? (
                                    <Link
                                        to={navigationItem.href}
                                        key={index}
                                        className={classNames(cls.AsideItem, {[cls.ActiveTab]: index === activeIndex.current}, [])}
                                    >
                                        <span className={cls.IconWrapper}>{navigationItem.icon}</span>
                                        <span className={cls.AsideContent}>{navigationItem.content}</span>
                                    </Link>
                                ) : (
                                    <div
                                        // todo edit here classes
                                        key={index}
                                        className={classNames('', {[cls.ActiveTab]: index === activeIndex.current}, [])}
                                    >
                                        {navigationItem.element}
                                    </div>
                                )
                            )
                    })}
                </nav>
            </div>

            <div>
                <ProfileTab/>

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
});
