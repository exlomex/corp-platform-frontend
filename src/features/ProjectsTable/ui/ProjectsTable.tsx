import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsTable.module.scss';
import {useSelector} from "react-redux";
import {getProjectUserProjects, ProjectDataInterface} from "@/entities/Project";
import {ReactNode, useEffect} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchUserProjects} from "@/entities/Project/model/services/fetchUserProjects.ts";
import {getIsFirstFetchUserProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {Column, Table} from "@/shared/ui/Table/Table.tsx";
import {ProjectsAdditionalButton} from "./ProjectsAdditionalButton.tsx";
import {Skeleton} from "@/shared/ui/Skeleton";

interface ProjectsTableProps {
    className?: string;
    noData?: boolean;
}

export const ProjectsTable = (props: ProjectsTableProps) => {
    const { className, noData = false } = props;

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

    type ProjectSkeletonType = {
        id: number;
        shortName: ReactNode;
        title: ReactNode;
        companyId: ReactNode;
        ownerId: ReactNode;
    }

    const ProjectSkeleton: ProjectSkeletonType[] = [{
        id: 1,
        shortName: <Skeleton height={25} width={60} border={4} />,
        title: <Skeleton height={25} width={120} border={4} />,
        companyId: <Skeleton height={25} width={40} border={4} />,
        ownerId: <Skeleton height={25} width={40} border={4} />,
    }];

    const tableColumnsSkeleton: Column<ProjectSkeletonType>[] = [
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
            width: '10%',
            alignColumn: 'right',
            alignTableData: 'right'
        }
    ]

    return (
        <div className={classNames(cls.ProjectsTable, {}, [className])}>
            {noData
                ? (<Table<ProjectSkeletonType>
                columns={tableColumnsSkeleton}
                data={ProjectSkeleton}/>)
                : <Table<ProjectDataInterface>
                columns={tableColumns}
                data={userProjects}
            />}
        </div>
    )
};
