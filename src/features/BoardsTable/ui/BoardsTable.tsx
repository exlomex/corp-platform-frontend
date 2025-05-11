import { classNames } from '@/shared/lib/classNames';
import cls from './BoardsTable.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {BoardInterface, getUserBoardsBySelectedProject} from "@/entities/Board";
import {Table} from "@/shared/ui/Table";
import {Column} from "@/shared/ui/Table/Table.tsx";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {useSelector} from "react-redux";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {useEffect} from "react";
import {FetchUserBoardsByProjectId} from "@/entities/Board/model/services/fetchUserBoardsByProjectId.ts";
import {Link} from "react-router";
import {getRouteBoards, getRouteProjectBoard} from "@/shared/const/router.ts";
import {Button} from "@/shared/ui/Button";
import {newBoardSliceActions} from "@/features/CreateNewBoard";

interface BoardsTableProps {
    className?: string;
}

export const BoardsTable = (props: BoardsTableProps) => {
    const { className } = props;

    const selectedProject = useSelector(getProjectSelectedProject);
    const userBoards = useSelector(getUserBoardsBySelectedProject);

    const tableColumns: Column<BoardInterface>[] = [
        {
            title: 'ID',
            key: 'id',
            width: '10%',
        },
        {
            title: 'Название доски',
            key: 'action',
            width: '70%',
            element: (row) => (
                <Link
                    className={cls.Link}
                    to={getRouteProjectBoard(String(selectedProject.id) ,String(row.id))}
                >
                    {row.title}
                </Link>
            ),
        },
        {
            title: 'ID проекта',
            key: 'projectId',
            width: '20%',
        },
    ];



    return (
        <div className={classNames(cls.BoardsTable, {}, [className])}>
            <Table<BoardInterface> columns={tableColumns} data={userBoards} />
        </div>
    )
};
