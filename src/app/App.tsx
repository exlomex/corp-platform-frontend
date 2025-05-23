import {memo, Suspense, useEffect, useState} from "react";
import {AppRouter} from "@/app/providers/Router";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {UserSliceActions} from "@/entities/User";
import {LoadingLine} from "@/shared/ui/LoadingLine";
import {CreateNewProjectModal, getIsCreateNewProjectModalOpen} from "@/features/CreateNewProject";
import {useSelector} from "react-redux";
import {CreateNewBoardModal} from "@/features/CreateNewBoard";
import {getTaskInfoModalIsOpen, SubTaskModal, TaskActions} from "@/entities/Task";
import {CreateExtendedTaskModal} from "@/features/CreateNewTask";
import {CommentActions, TaskInfoModal} from "@/features/TaskInfo";
import {useLocation, useNavigate} from "react-router";
import {StatusActions} from "@/entities/Status";


export const App = memo(() => {
    const [isInited, setIsInited] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(UserSliceActions.initAuth())
        setIsInited(true)
    }, [dispatch]);

    // tasks
    const TaskInfoModalIsOpen = useSelector(getTaskInfoModalIsOpen)

    const location = useLocation();
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const searchParamsSelectedTask = queryParams.get('selectedTask')

    useEffect(() => {
        if (searchParamsSelectedTask) {
            dispatch(TaskActions.setSelectedTaskUniqueTitle(searchParamsSelectedTask))
            dispatch(TaskActions.setTaskInfoModalIsOpen(true))
        }
    }, [dispatch, searchParamsSelectedTask]);
    const onTaskInfoModalClose = () => {
        dispatch(TaskActions.setSelectedTaskInfo(undefined))
        dispatch(CommentActions.resetSlice())
        dispatch(TaskActions.setTaskInfoModalIsOpen(false))
        dispatch(TaskActions.resetNavigationHistory())
        dispatch(StatusActions.setSelectedTaskBoardStatuses([]))
        queryParams.delete('selectedTask')
        dispatch(TaskActions.setSelectedTaskUniqueTitle(''))
        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }

    if (isInited) {
        return (
            <div className={'App'}>
                <Suspense>
                    <AppRouter/>
                </Suspense>

                {/* Progress bar */}
                <LoadingLine/>

                {/* Create new project modal */}
                <CreateNewProjectModal/>

                {/* Create new board modal */}
                <CreateNewBoardModal/>

                {/* AddSubTaskModal */}
                <SubTaskModal/>

                {/* AddTaskModal */}
                <CreateExtendedTaskModal/>

                {/* TaskInfoModal */}
                {<TaskInfoModal isOpen={TaskInfoModalIsOpen} onClose={onTaskInfoModalClose}/>}
            </div>
        )
    }

    return (
        <></>
    )
});