import { classNames } from '@/shared/lib/classNames';
import cls from './SnapshotsTab.module.scss';
import {useSelector} from "react-redux";
import {getSelectedTaskInfo, getSelectedTaskSnapshotsIsFetching} from "@/entities/Task";
import {useEffect, useMemo, useRef} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {getSelectedTaskSnapshots} from "@/entities/Task/model/selectors/getTaskValues.ts";
import {SnapshotsTable} from "../SnapshotsTable/SnapshotsTable.tsx";
import {FetchTaskSnapshots} from "@/entities/Task/model/services/fetchTaskSnapshots.ts";

interface SnapshotsTabProps {
    className?: string;
}

export const SnapshotsTab = (props: SnapshotsTabProps) => {
    const { className } = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo);
    const dispatch = useAppDispatch();

    const selectedTaskSnapshots = useSelector(getSelectedTaskSnapshots);

    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const selectedSnapshotVersion = searchParams.get("selectedSnapshotVersion")

    const snapshotsIsFetching = useSelector(getSelectedTaskSnapshotsIsFetching);

    const prevTaskIdRef = useRef<number | null>(null);

    useEffect(() => {
        const currentTaskId = selectedTaskInfo?.id;

        if (prevTaskIdRef.current === currentTaskId) return;

        if (!selectedSnapshotVersion && !snapshotsIsFetching) {
            if (selectedTaskInfo?.id) {
                dispatch(FetchTaskSnapshots({taskId: selectedTaskInfo.id}));
            }
        } else {
            if (selectedTaskInfo?.id && (!selectedTaskSnapshots || selectedTaskSnapshots.length === 0) && !snapshotsIsFetching) {
                dispatch(FetchTaskSnapshots({taskId: selectedTaskInfo.id}));
            }
        }

        prevTaskIdRef.current = currentTaskId;
    }, [dispatch, searchParams, selectedSnapshotVersion, selectedTaskInfo?.id, selectedTaskSnapshots, snapshotsIsFetching]);

    // useEffect(() => {
    //     if (selectedTaskInfo?.id && (!selectedTaskSnapshots || selectedTaskSnapshots.length === 0)) {
    //         dispatch(FetchTaskSnapshots({taskId: selectedTaskInfo.id}));
    //     }
    // }, [dispatch, selectedTaskInfo?.id, selectedTaskSnapshots]);

    // if (!selectedTaskSnapshots) {
    //     return <></>;
    // }

    return (
        <div className={classNames(cls.SnapshotsTab, {}, [className])}>
            <SnapshotsTable noData={!selectedTaskSnapshots} isFetching={snapshotsIsFetching}/>
        </div>
    )
};
