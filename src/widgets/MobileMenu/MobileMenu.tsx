import { useRef, useState } from "react";
import cls from "./MobileMenu.module.scss";
import { classNames } from "@/shared/lib/classNames";
import LightLogo from '@/shared/assets/logo/light_full_logo.svg';
import TaskIcon from '@/shared/assets/icons/tasks.svg';
import ProjectsIcon from '@/shared/assets/icons/projects.svg';
import MessagesIcon from '@/shared/assets/icons/messages.svg';
import BurgerIcon from '@/shared/assets/icons/burger.svg';
import CloseIcon from '@/shared/assets/icons/closeArrow.svg';
import { getRouteMain, getRouteProjects } from "@/shared/const/router";
import { Link, useLocation } from "react-router";
import { BoardTabContent } from "@/features/BoadsTab";
import { navTabContentValues } from "@/widgets/AsideMenu/ui/AsideMenu.tsx";
import { ReactElement } from "react";

type defaultNavItem = {
    icon: ReactElement;
    content: navTabContentValues;
    href?: string;
}

type JSXNavElement = {
    element: ReactElement;
    content: navTabContentValues;
}

type navItemType = defaultNavItem | JSXNavElement;

export const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const navigationItems: navItemType[] = [
        {
            icon: <TaskIcon />,
            content: 'Задачи',
        },
        {
            element: <BoardTabContent isMobile isCollapsed={false} />,
            content: 'Agile доски'
        },
        {
            icon: <ProjectsIcon />,
            content: 'Проекты',
            href: getRouteProjects()
        },
        {
            icon: <MessagesIcon />,
            content: 'Сообщения',
        }
    ];

    const location = useLocation();

    const asideTabsMapper: Record<string, navTabContentValues> = {
        'projects': 'Проекты',
        'agileBoards': 'Agile доски',
        'tasks': 'Задачи',
        'messages': 'Сообщения'
    };

    const pathname = location.pathname.replace('/', '');
    const activeIndex = useRef<number>(
        navigationItems.findIndex(item => item.content === asideTabsMapper[pathname])
    );

    return (
        <div className={cls.MobileMenuWrapper}>
            <div className={cls.TopBar}>
                <Link to={getRouteMain()} className={cls.Logo}>
                    <LightLogo />
                </Link>
                <button onClick={toggleMenu} className={cls.BurgerButton}>
                    {isOpen ? <CloseIcon /> : <BurgerIcon />}
                </button>
            </div>

            <div className={classNames(cls.MenuContent, {[cls.MenuIsOpen]: isOpen}, [])}>
                {navigationItems.map((item, index) => 'element' in item ? (
                    <div
                        key={index} className={classNames('', {[cls.ActiveTab]: index === activeIndex.current})}
                    >
                        {item.element}
                    </div>
                        ) : (
                            <Link
                                key={index}
                                to={item.href || '#'}
                                className={classNames(cls.MenuItem, {
                                    [cls.ActiveTab]: index === activeIndex.current
                                })}
                            >
                                <span className={cls.IconWrapper}>{item.icon}</span>
                                <span>{item.content}</span>
                            </Link>
                        )
                    )}
            </div>
        </div>
    );
};
