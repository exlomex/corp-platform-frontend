import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsTable.module.scss';
import {useSelector} from "react-redux";
import {getProjectUserProjects, ProjectDataInterface} from "@/entities/Project";
import {useEffect} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchUserProjects} from "@/entities/Project/model/services/fetchUserProjects.ts";
import {getIsFirstFetchUserProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {Column, Table} from "@/shared/ui/Table/Table.tsx";
import {ProjectsAdditionalButton} from "./ProjectsAdditionalButton.tsx";

interface ProjectsTableProps {
    className?: string;
}

export const ProjectsTable = (props: ProjectsTableProps) => {
    const { className } = props;

    const userProjects = useSelector(getProjectUserProjects)

    const dispatch = useAppDispatch()
    const isFirstCallFetchUserProjects = useSelector(getIsFirstFetchUserProject)

    useEffect(() => {
        if (!userProjects && isFirstCallFetchUserProjects) {
            dispatch(FetchUserProjects())
        }
    }, [dispatch, isFirstCallFetchUserProjects, userProjects]);

    const tableColumns: Column<ProjectDataInterface>[] = [
        {
            title: 'Имя',
            key: 'title',
            width: '30%'
        },
        {
            title: 'Ключ',
            key: 'shortName',
        },
        {
            key: 'action',
            title: 'Дополнительные действия',
            element: (row) => <ProjectsAdditionalButton
                projectId={row.id}
                projectTitle={row.title}
                ownerId={row.ownerId}
                id={row.id}/>,
            width: '10%',
            alignColumn: 'right',
            alignTableData: 'right'
        }
    ]

    return (
        <div className={classNames(cls.ProjectsTable, {}, [className])}>
            <Table<ProjectDataInterface>
                columns={tableColumns}
                data={userProjects}
            />
        </div>
    )
};
