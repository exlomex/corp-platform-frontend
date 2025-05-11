import { classNames } from '@/shared/lib/classNames';
import cls from './BoardsPageContent.module.scss';
import {BoardsTable} from "@/features/BoardsTable";
import {MobileMenu} from "@/widgets/MobileMenu/MobileMenu.tsx";

interface BoardsPageContentProps {
    className?: string;
}

export const BoardsPageContent = (props: BoardsPageContentProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.BoardsPageContent, {}, [className])}>
            {/*<MobileMenu/>*/}
            <BoardsTable/>
        </div>
    )
};
