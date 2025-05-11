import { classNames } from '@/shared/lib/classNames';
import cls from './BoardCard.module.scss';
import {Link} from "react-router";
import {getRouteProjectBoard} from "@/shared/const/router.ts";
import UpRightIcon from '@/shared/assets/icons/upRightIcon.svg'
import {useState} from "react";

interface BoardCardProps {
    className?: string;
    boardTitle: string
    boardId: number
    projectId: number
}

export const BoardCard = (props: BoardCardProps) => {
    const { className, boardTitle, boardId, projectId} = props;

    const [isHover, setIsHover] = useState(false)

    return (
        <Link
            to={getRouteProjectBoard(String(projectId), String(boardId))}
            className={classNames(cls.BoardCard, {}, [className])}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <p className={cls.BoardTitle}>{boardTitle}</p>

            <div className={classNames(cls.BottomLine, {[cls.isHover]: isHover}, [])}>
                <span className={cls.InterToBoard}>Перейти <UpRightIcon/></span>
            </div>
        </Link>
    )
};
