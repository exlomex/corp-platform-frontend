import { classNames } from '@/shared/lib/classNames';
import cls from './SnapshotsTab.module.scss';
import {useSelector} from "react-redux";
import {getSelectedTaskInfo} from "@/entities/Task";
import {useEffect} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchTaskSnapshots} from "@/features/TaskInfo/Snapshots/model/services/fetchTaskSnapshots.ts";
import {getSelectedTaskSnapshots} from "@/entities/Task/model/selectors/getTaskValues.ts";
import {SnapshotsTable} from "../SnapshotsTable/SnapshotsTable.tsx";

interface SnapshotsTabProps {
    className?: string;
}

export const SnapshotsTab = (props: SnapshotsTabProps) => {
    const { className } = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo);
    const dispatch = useAppDispatch();

    const selectedTaskSnapshots = useSelector(getSelectedTaskSnapshots);

    useEffect(() => {
        if (selectedTaskInfo?.id && (!selectedTaskSnapshots || selectedTaskSnapshots.length === 0)) {
            dispatch(FetchTaskSnapshots({taskId: selectedTaskInfo.id}));
        }
    }, [dispatch, selectedTaskInfo, selectedTaskSnapshots]);

    if (!selectedTaskSnapshots) {
        return <></>;
    }

    return (
        <div className={classNames(cls.SnapshotsTab, {}, [className])}>
            <SnapshotsTable/>
        </div>
    )
};
