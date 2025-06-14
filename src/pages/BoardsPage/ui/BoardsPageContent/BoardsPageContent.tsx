import { classNames } from '@/shared/lib/classNames';
import cls from './BoardsPageContent.module.scss';
import {BoardsTable} from "@/features/BoardsTable";
import {MobileMenu} from "@/widgets/MobileMenu/MobileMenu.tsx";
import {Typography} from "@/shared/ui/Typography";
import {Button} from "@/shared/ui/Button";
import {newBoardSliceActions} from "@/features/CreateNewBoard";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {useEffect} from "react";
import {FetchUserBoardsByProjectId} from "@/entities/Board/model/services/fetchUserBoardsByProjectId.ts";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {
    BoardCard,
    getIsUserBoardsFetching,
    getIsUserBoardsFirstLoading,
    getUserBoardsBySelectedProject
} from "@/entities/Board";
import NoDataIllustration from '@/shared/assets/illustations/noDataIllustration.svg'
import {getUserInfo} from "@/entities/User/model/selectors/getUserValues.ts";
import {Helmet} from "react-helmet";

interface BoardsPageContentProps {
    className?: string;
}

export const BoardsPageContent = (props: BoardsPageContentProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()

    const onNewBoardClickHandler = () => {
        dispatch(newBoardSliceActions.setCreateBoardModalOpen(true))
    }

    const selectedProject = useSelector(getProjectSelectedProject);
    const userBoardsFetching = useSelector(getIsUserBoardsFetching)
    const userBoardIsFirstTimeFetching = useSelector(getIsUserBoardsFirstLoading)
    const userBoards = useSelector(getUserBoardsBySelectedProject);

    // useEffect(() => {
    //     if (selectedProject?.id) {
    //         console.log('call FetchUserBoardsByProjectId');
    //         dispatch(FetchUserBoardsByProjectId({ projectId: selectedProject.id }));
    //     }
    // }, [dispatch, selectedProject?.id]);

    const userInfo = useSelector(getUserInfo);
    const editIsPossible = userInfo?.allowedProjects.includes(selectedProject?.id)

    return (
        <div className={classNames(cls.BoardsPageContent, {}, [className])}>
            <Helmet>
                <title>{`Все доски`}</title>
            </Helmet>

            <div className={cls.TopLine}>
                <Typography size={'PARAGRAPH-18-REGULAR'}
                            className={cls.TableHeading}>{selectedProject?.title}</Typography>
                {editIsPossible && <Button onClick={onNewBoardClickHandler} buttonType={'SMART_TEXT_BTN_FILLED'}>Создать доску</Button>}
            </div>
            {/*<MobileMenu/>*/}

            {userBoardIsFirstTimeFetching || userBoardsFetching
                ? <></>
                : (userBoards.length
                        ? (
                            <div className={cls.BoardCards}>
                                {userBoards.map(board => (
                                    <BoardCard key={board.id} projectId={selectedProject.id} boardTitle={board.title} boardId={board.id}/>
                                ))}
                            </div>
                        )
                        : <div className={cls.NoDataContainer}>
                            <div className={cls.NoData}>
                                <NoDataIllustration/>
                                <Typography size={'PARAGRAPH-18-REGULAR'}>Доски не найдены</Typography>
                            </div>
                        </div>
                )
            }
        </div>
    )
};
