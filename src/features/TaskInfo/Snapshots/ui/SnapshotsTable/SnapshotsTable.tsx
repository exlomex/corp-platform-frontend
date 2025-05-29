import { classNames } from '@/shared/lib/classNames';
import cls from './SnapshotsTable.module.scss';
import {useEffect, useState} from "react";
import {Column, Table} from "@/shared/ui/Table/Table.tsx";
import {NormalizedSnapshotType, normalizeSnapshots} from "@/features/TaskInfo/Snapshots/lib/normalizeSnapshots.tsx";
import {useSelector} from "react-redux";
import {getSelectedTaskSnapshots} from "@/entities/Task/model/selectors/getTaskValues.ts";

interface SnapshotsTableProps {
    className?: string;
}

export const SnapshotsTable = (props: SnapshotsTableProps) => {
    const { className } = props;

    const [normalizedSnapshots, setNormalizedSnapshots] = useState<NormalizedSnapshotType[]>(null)

    const selectedTaskSnapshots = useSelector(getSelectedTaskSnapshots);

    useEffect(() => {
        if (selectedTaskSnapshots?.length >= 1) {
            setNormalizedSnapshots(normalizeSnapshots(selectedTaskSnapshots))
        }
    }, [selectedTaskSnapshots]);

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

    return (
        <Table<NormalizedSnapshotType> columns={SnapshotsColumns} data={normalizedSnapshots} className={classNames(cls.SnapshotsTable, {}, [className])}/>
    )
};
