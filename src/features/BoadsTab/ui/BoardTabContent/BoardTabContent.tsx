import { classNames } from '@/shared/lib/classNames';
import cls from './BoardTabContent.module.scss';
import {Popover} from "@/shared/ui/popups";
import {BoardTabButton} from "@/features/BoadsTab/ui/BoardTabButton/BoardTabButton.tsx";
import BoardIcon from "@/shared/assets/icons/boardIcon.svg";
import {Typography} from "@/shared/ui/Typography";
import {Button} from "@/shared/ui/Button";
import AddIcon from "@/shared/assets/icons/addIcon.svg";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {useTheme} from "@/shared/hooks/useTheme";
import {Link, useNavigate, useParams} from "react-router";
import {useCallback, useEffect} from "react";
import {getIsUserBoardsFetching, getIsUserBoardsFirstLoading, getUserBoardsBySelectedProject} from "@/entities/Board";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchUserBoardsByProjectId} from "@/entities/Board/model/services/fetchUserBoardsByProjectId.ts";
import {getRouteBoards, getRouteProjectBoard} from "@/shared/const/router.ts";
import {newBoardSliceActions} from "@/features/CreateNewBoard";

interface BoardTabContentProps {
    className?: string;
    isCollapsed: boolean
    isMobile?: boolean
}

export const BoardTabContent = (props: BoardTabContentProps) => {
    const { className, isCollapsed, isMobile = false } = props;

    // const selectedBoard = useSelector()

    const {theme} = useTheme()

    const onNewBoardClickHandler = () => {
        dispatch(newBoardSliceActions.setCreateBoardModalOpen(true))
    }

    const dispatch = useAppDispatch()

    const selectedProject = useSelector(getProjectSelectedProject)

    useEffect(() => {
        if (selectedProject) {
            dispatch(FetchUserBoardsByProjectId({projectId: selectedProject.id}))
        }
    }, [dispatch, selectedProject]);

    const userBoards = useSelector(getUserBoardsBySelectedProject)
    const navigate = useNavigate()
    const onBoardItemClickHandler = (id: number, close: () => void) => () => {
        navigate(getRouteProjectBoard(selectedProject.title, String(id)))
        close()
    }

    const params = useParams()
    const onActiveBoardTabCheck = useCallback((boardId: number) => {
        if (params.board) {
            return +params.board === boardId;
        }
        return false;
    }, [params.board]);

    if (!selectedProject) {
        return <BoardTabButton isCollapsed={isCollapsed} active={false}/>
    }

    return (
        <Popover
            direction={isMobile ? 'bottom' : 'right'}
            className={classNames(cls.BoardTabContent, {}, [className])}
            trigger={<BoardTabButton isCollapsed={isCollapsed}/>}
            popoverPanelClassName={classNames('', {[cls.isMobile]: isMobile}, [])}
        >
            {({open, close}) => (
                <div
                    className={classNames(cls.BoardsWrapper, {}, [theme === 'light_theme' ? 'dark_theme' : 'light_theme'])}
                >
                    <div className={cls.BoardTabTopLine}>
                        <p className={cls.BoardHeader}>{selectedProject && selectedProject.title}</p>
                        <Link className={cls.AllBoardsLink} to={getRouteBoards(`${selectedProject.id}`)}>Все доски</Link>
                    </div>

                    <div className={cls.BoardsList}>
                        {userBoards && userBoards.length ? (
                            userBoards.map((board, index) => (
                                <div
                                    onClick={onBoardItemClickHandler(board.id, close)}
                                    key={board.id}
                                    className={classNames(
                                        cls.BoardItem,
                                        {[cls.ActiveBoard]: onActiveBoardTabCheck(board.id)},
                                        [])}
                                >
                                    <span className={cls.BoardIcon}><BoardIcon/></span>

                                    <p>{board.title}</p>
                                </div>
                            ))
                        ) : (
                            <Typography size={'PARAGRAPH-14-REGULAR'} className={cls.NotFoundedTitle}>Доски не
                                найдены</Typography>
                        )}

                        <Button onClick={onNewBoardClickHandler} buttonType={'CREATE_WITH_ICON_BTN_FILLED'} fullWidth><AddIcon/>
                            Создать доску
                        </Button>
                    </div>
                </div>
            )}
        </Popover>
    )
};
