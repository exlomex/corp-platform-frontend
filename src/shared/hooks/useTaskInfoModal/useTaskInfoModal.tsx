import {useEffect, useCallback, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskActions, getTaskInfoModalIsOpen } from "@/entities/Task";
import { CommentActions } from "@/features/TaskInfo";
import { StatusActions } from "@/entities/Status";
import {useLocation, useNavigate} from "react-router";
import {useTaskSearchParams} from "@/shared/hooks/useTaskSearchParams";

export const useTaskInfoModal = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const isModalOpen = useSelector(getTaskInfoModalIsOpen);

    const {selectedTask, queryParams, selectedTaskType} = useTaskSearchParams()

    useEffect(() => {
        if (selectedTask) {
            dispatch(TaskActions.setSelectedTaskUniqueTitle(selectedTask));
            dispatch(TaskActions.setTaskInfoModalIsOpen(true));
        }
    }, [dispatch, selectedTask]);

    const onClose = useCallback(() => {
        dispatch(TaskActions.setSelectedTaskInfo(undefined));
        dispatch(CommentActions.resetSlice());
        dispatch(TaskActions.setTaskInfoModalIsOpen(false));
        dispatch(TaskActions.resetNavigationHistory());
        dispatch(StatusActions.setSelectedTaskBoardStatuses([]));
        dispatch(TaskActions.setSelectedTaskSnapshots([]));
        queryParams.delete("selectedTask");
        if (selectedTaskType === 'snapshot') {
            queryParams.delete("selectedSnapshotVersion");
        }
        dispatch(TaskActions.setSelectedTaskUniqueTitle(""));
        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }, [dispatch, queryParams, selectedTaskType, navigate, location.pathname]);

    return {
        isModalOpen,
        onClose,
    };
};
