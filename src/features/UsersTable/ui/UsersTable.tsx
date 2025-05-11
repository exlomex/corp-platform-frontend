import { classNames } from '@/shared/lib/classNames';
import cls from './UsersTable.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {Table} from "@/shared/ui/Table";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {getUserCompanyId, getUserCompanyUsers} from "@/entities/User/model/selectors/getUserValues.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchUsersByCompanyIdService, UserI} from "@/entities/User";
import {Column} from "@/shared/ui/Table/Table.tsx";
import {ProjectDataInterface} from "@/entities/Project";
import {ProjectsAdditionalButton} from "@/features/ProjectsTable/ui/ProjectsAdditionalButton.tsx";
import {UsersAdditionalButton} from "@/features/UsersTable/ui/UsersAdditionalButton.tsx";

interface UsersTableProps {
    className?: string;
}

export const UsersTable = (props: UsersTableProps) => {
    const { className } = props;

    const companyUsers = useSelector(getUserCompanyUsers)
    const companyId = useSelector(getUserCompanyId)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!companyUsers.length && companyId) {
            dispatch(FetchUsersByCompanyIdService({companyId: companyId}))
        }
    }, [companyId, companyUsers, dispatch]);

    const tableColumns: Column<UserI>[] = [
        {
            title: 'id',
            key: 'id',
            width: '6%'
        },
        {
            title: 'Имя',
            key: 'firstName',
            width: '20%',
        },
        {
            title: 'Фамилия',
            key: 'lastName',
            width: '20%',
        },
        {
            title: 'ID компании',
            key: 'companyId',
            width: '20%',
        },
        {
            key: 'action',
            title: 'Дополнительные действия',
            element: (row) => <UsersAdditionalButton id={row.id} />,
            width: '20%',
            alignColumn: 'right',
            alignTableData: 'right',
        },
    ];


    return (
        <div className={classNames(cls.UsersTable, {}, [className])}>
            <Typography size={'PARAGRAPH-16-REGULAR'} className={cls.TableHeading}>Все пользователи компании</Typography>

            <Table<UserI> columns={tableColumns} data={companyUsers}></Table>
        </div>
    )
};
