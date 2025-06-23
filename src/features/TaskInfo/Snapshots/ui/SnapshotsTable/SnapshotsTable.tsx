import { classNames } from '@/shared/lib/classNames';
import cls from './SnapshotsTable.module.scss';
import {useEffect, useMemo, useState} from "react";
import {Column, Table} from "@/shared/ui/Table/Table.tsx";
import {NormalizedSnapshotType, normalizeSnapshots} from "@/features/TaskInfo/Snapshots/lib/normalizeSnapshots.tsx";
import {useSelector} from "react-redux";
import {
    getSelectedTaskSnapshots,
} from "@/entities/Task/model/selectors/getTaskValues.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {TaskActions} from "@/entities/Task";
import { useSearchParams} from "react-router";
import {Skeleton} from "@/shared/ui/Skeleton";

interface SnapshotsTableProps {
    className?: string;
    noData?: boolean;
    isFetching: boolean;
}

export const SnapshotsTable = (props: SnapshotsTableProps) => {
    const { className, noData, isFetching } = props;

    const [normalizedSnapshots, setNormalizedSnapshots] = useState<NormalizedSnapshotType[]>(null)

    const selectedTaskSnapshots = useSelector(getSelectedTaskSnapshots);

    const dispatch = useAppDispatch();

    // const {selectedSnapshotVersion, selectedTask, queryParams} = useTaskSearchParams();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (selectedTaskSnapshots?.length >= 1) {
            const handler = (version: number) => () => {
                const selectedSnapshotVersion = searchParams.get('selectedSnapshotVersion');
                const selectedTask = searchParams.get('selectedTask');

                if (version === +selectedSnapshotVersion)  {
                    return
                }

                if (selectedSnapshotVersion) {
                    dispatch(TaskActions.pushToNavigationHistory({
                        historyTaskType: "snapshot",
                        uniqueTitle: selectedTask,
                        selectedSnapshotVersion,
                    }));
                } else if (selectedTask) {
                    dispatch(TaskActions.pushToNavigationHistory({
                        historyTaskType: "task",
                        uniqueTitle: selectedTask,
                    }));
                }
            };

            setNormalizedSnapshots(normalizeSnapshots(selectedTaskSnapshots, handler));
        }
    }, [selectedTaskSnapshots, searchParams, dispatch]);

    const SnapshotsColumns: Column<NormalizedSnapshotType>[] = [
        {
            title: 'Код',
            key: 'title',
            width: '15%'
        },
        {
            title: 'Изменено',
            key: 'modifiedBy',
            width: '35%'
        },
        {
            title: 'Дата изменения',
            key: 'modifiedDate',
            width: '35%'
        },
        {
            title: 'Версия',
            key: 'version',
            alignTableData: 'center',
            alignColumn: 'center',
        },
    ]

    const snapshotSkeletons: NormalizedSnapshotType[] = [
        {
            id: 1,
            title: <Skeleton height={25} width={100} border={6} />,
            modifiedBy: <Skeleton height={25} width={140} border={6} />,
            modifiedDate: <Skeleton height={25} width={90} border={6} />,
            version: <Skeleton height={25} width={40} border={6} />,
        },
        {
            id: 2,
            title: <Skeleton height={25} width={100} border={6} />,
            modifiedBy: <Skeleton height={25} width={140} border={6} />,
            modifiedDate: <Skeleton height={25} width={90} border={6} />,
            version: <Skeleton height={25} width={40} border={6} />,
        },
    ];

    if (noData || isFetching) return (
        <Table<NormalizedSnapshotType> columns={SnapshotsColumns} data={snapshotSkeletons} className={classNames(cls.SnapshotsTable, {}, [className])}/>
    )

    return (
        <Table<NormalizedSnapshotType> columns={SnapshotsColumns} data={normalizedSnapshots} className={classNames(cls.SnapshotsTable, {}, [className])}/>
    )
};
