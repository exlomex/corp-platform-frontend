import { classNames } from '@/shared/lib/classNames';
import cls from './BoardCard.module.scss';
import {Link} from "react-router";
import {getRouteProjectBoard} from "@/shared/const/router.ts";
import UpRightIcon from '@/shared/assets/icons/upRightIcon.svg'
import React, {useState} from "react";
import TrashIcon from "@/shared/assets/icons/smallTrashIcon.svg";
import {Button} from "@/shared/ui/Button";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {DeleteBoardService} from "@/entities/Board";
import {FetchUserBoardsByProjectId} from "@/entities/Board/model/services/fetchUserBoardsByProjectId.ts";
import {useSelector} from "react-redux";
import {getUserInfo, getUserRole} from "@/entities/User/model/selectors/getUserValues.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

interface BoardCardProps {
    className?: string;
    boardTitle: string
    boardId: number
    projectId: number
}

export const BoardCard = (props: BoardCardProps) => {
    const { className, boardTitle, boardId, projectId} = props;

    const [isHover, setIsHover] = useState(false)
    const dispatch = useAppDispatch();

    const onDeleteButtonClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await dispatch(DeleteBoardService({boardId: boardId, projectId: projectId})).unwrap()
            await dispatch(FetchUserBoardsByProjectId({projectId}))
        } catch (e) {
            console.error(e);
        }
    }

    const userInfo = useSelector(getUserInfo)
    const userRole = useSelector(getUserRole)
    const selectedProject = useSelector(getProjectSelectedProject);

    return (
        <Link
            to={getRouteProjectBoard(String(projectId), String(boardId))}
            className={classNames(cls.BoardCard, {}, [className])}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className={cls.TopLine}>
                <p className={cls.BoardTitle}>{boardTitle}</p>
                {isHover && (userRole === 'COMPANY_OWNER' || userInfo?.id === selectedProject?.ownerId) && (<Button
                    className={cls.DeleteButton}
                    onClick={onDeleteButtonClickHandler}
                    buttonType={'EXTRA_SMALL_ICON_BTN_FILLED'}
                >
                    <TrashIcon/>
                </Button>)}
            </div>


            <div className={classNames(cls.BottomLine, {[cls.isHover]: isHover}, [])}>
                <span className={cls.InterToBoard}>Перейти <UpRightIcon/></span>
            </div>
        </Link>
    )
};
