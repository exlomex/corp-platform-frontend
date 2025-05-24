import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskActions, getTaskInfoModalIsOpen } from "@/entities/Task";
import { CommentActions } from "@/features/TaskInfo";
import { StatusActions } from "@/entities/Status";
import {useLocation, useNavigate} from "react-router";

export const useTaskInfoModal = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const isModalOpen = useSelector(getTaskInfoModalIsOpen);

    const queryParams = new URLSearchParams(location.search);
    const selectedTask = queryParams.get("selectedTask");

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
        queryParams.delete("selectedTask");
        dispatch(TaskActions.setSelectedTaskUniqueTitle(""));
        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }, [dispatch, navigate, location.pathname, queryParams]);

    return {
        isModalOpen,
        onClose,
    };
};
