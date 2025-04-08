import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsTable.module.scss';
import {useSelector} from "react-redux";
import {getProjectUserProjects, ProjectDataInterface} from "@/entities/Project";
import {useEffect} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchUserProjects} from "@/entities/Project/model/services/fetchUserProjects.ts";
import {getIsFirstFetchUserProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {Column, Table} from "@/shared/ui/Table/Table.tsx";
import {ProjectSliceSchema} from "@/entities/Project/model/types/projectSliceSchema.ts";

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
            width: '20%'
        },
        {
            title: 'Ключ',
            key: 'shortName',
            width: '30%'
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
