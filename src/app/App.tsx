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
            </div>
        )
    }

    return (
        <></>
    )
});