import {useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router";

export const useTaskSearchParams = () => {
    const location = useLocation();
    const search = location.search.replace(/&amp;/g, '&');

    const [selectedTaskType, setSelectedTaskType] = useState<'task' | 'snapshot' | null>(null)

    const queryParams = useMemo(() => new URLSearchParams(search), [search])
    const selectedTask = queryParams.get("selectedTask");
    const selectedSnapshotVersion = queryParams.get("selectedSnapshotVersion");


    useEffect(() => {
        if (selectedSnapshotVersion) {
            setSelectedTaskType('snapshot');
        }
        else if (selectedTask) {
            setSelectedTaskType('task');
        }  else {
            setSelectedTaskType(null);
        }

    }, [selectedSnapshotVersion, selectedTask]);

    return {
        selectedTask,
        selectedSnapshotVersion,
        queryParams,
        selectedTaskType
    }
};
