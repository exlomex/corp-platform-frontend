import { classNames } from '@/shared/lib/classNames';
import cls from './MainLayout.module.scss';
import {ReactElement} from "react";

interface MainLayoutProps {
    className?: string;
    aside: ReactElement;
    content: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
    const { className, content, aside } = props;
    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.AsideMenu}>{aside}</div>
            <div className={cls.MainContent}>{content}</div>
        </div>
    )
};
