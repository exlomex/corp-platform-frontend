import { classNames } from '@/shared/lib/classNames';
import cls from './BoardsPage.module.scss';
import {AsideMenu} from "@/widgets/AsideMenu";
import {MainLayout} from "@/shared/layouts/MainLayout";
import {BoardsPageContent} from "@/pages/BoardsPage/ui/BoardsPageContent/BoardsPageContent.tsx";

interface BoardsPageProps {
    className?: string;
}

export function BoardsPage(props: BoardsPageProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.BoardsPage, {}, [className])}>
            <MainLayout
                aside={<AsideMenu/>}
                content={<BoardsPageContent/>}
            />
        </div>
    )
}

export default BoardsPage