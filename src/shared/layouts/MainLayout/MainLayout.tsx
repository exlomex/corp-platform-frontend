import { classNames } from '@/shared/lib/classNames';
import cls from './MainLayout.module.scss';
import {ReactElement} from "react";
import {LOCAL_STORAGE_COLLAPSED_KEY} from "@/shared/const/localstorage.ts";

interface MainLayoutProps {
    className?: string;
    aside: ReactElement;
    content: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
    const { className, content, aside } = props;

    const isCollapsed = localStorage.getItem(LOCAL_STORAGE_COLLAPSED_KEY)

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.AsideMenu}>{aside}</div>
            <div className={classNames(cls.MainContent, {[cls.isCollapsed]: isCollapsed}, [])}>{content}</div>
        </div>
    )
};
