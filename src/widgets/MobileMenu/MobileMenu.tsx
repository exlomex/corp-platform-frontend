import {useEffect, useLayoutEffect, useRef, useState} from "react";
import cls from "./MobileMenu.module.scss";
import { classNames } from "@/shared/lib/classNames";
import LightLogo from '@/shared/assets/logo/light_full_logo.svg';
import TaskIcon from '@/shared/assets/icons/tasks.svg';
import ProjectsIcon from '@/shared/assets/icons/projects.svg';
import MessagesIcon from '@/shared/assets/icons/messages.svg';
import LeftArrowIcon from '@/shared/assets/icons/leftArrowIcon.svg'
import {getRouteMain, getRouteMessages, getRouteProjects} from "@/shared/const/router";
import {Link, useLocation, useSearchParams} from "react-router";
import { BoardTabContent } from "@/features/BoadsTab";
import {navItemType, navTabContentValues} from "@/widgets/AsideMenu/ui/AsideMenu.tsx";
import {ProjectsTab} from "@/features/ProjectsTab";
import {ProfileTab} from "@/features/ProfileTab";
import {Button} from "@/shared/ui/Button";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";


export const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const selectedProject = useSelector(getProjectSelectedProject)

    const navigationItems: navItemType[] = [
        {
            icon: <TaskIcon />,
            content: 'Задачи',
            href: getRouteMain(),
            disabled: !selectedProject
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
            href: getRouteMessages()
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

    useLayoutEffect(() => {
        setIsOpen(false)
    }, [location.pathname]);

    const [searchParams, setSearchParams] = useSearchParams();
    const selectedMessage = searchParams.get("selectedMessage");

    const onBackMessageButtonClickHandler = () => {
        searchParams.delete("selectedMessage");
        setSearchParams(searchParams);
    };

    return (
        <div className={classNames(cls.MobileMenuWrapper, {[cls.MenuIsOpen]: isOpen}, [])}>
            <div className={cls.TopBar}>
                {selectedMessage && <Button className={cls.CloseMessageIcon} onClick={onBackMessageButtonClickHandler} buttonType={'SMALL_ICON_BTN_FILLED'}><LeftArrowIcon/></Button>}

                <Link to={selectedProject ? getRouteMain() : null} className={cls.Logo}>
                    <LightLogo />
                </Link>

                <div
                    className={classNames(cls.burger, { [cls.open]: isOpen })}
                    onClick={toggleMenu}
                >
                    <span className={cls.line}></span>
                    <span className={cls.line}></span>
                    <span className={cls.line}></span>
                </div>
            </div>

                <div className={classNames(cls.MenuContent, {[cls.MenuIsOpen]: isOpen}, [])}>
                    <ProjectsTab isMobile className={cls.ProjectTab}/>

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
                                    [cls.ActiveTab]: index === activeIndex.current,
                                    [cls.Disabled]: item.disabled
                                })}
                            >
                                <span className={cls.IconWrapper}>{item.icon}</span>
                                <span>{item.content}</span>
                            </Link>
                        )
                    )}

                    <ProfileTab isMobile/>
                </div>
        </div>
    );
};
