import {Suspense, useEffect, useState} from "react";
import {AppRouter} from "@/app/providers/Router";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {UserSliceActions} from "@/entities/User";
import {LoadingLine} from "@/shared/ui/LoadingLine";
import {useSelector} from "react-redux";
import {getProjectUserProjects} from "@/entities/Project";
import {FetchUserProjects} from "@/entities/Project/model/services/fetchUserProjects.ts";
import {getIsFirstFetchUserProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

export const App = () => {
    const [isInited, setIsInited] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(UserSliceActions.initAuth())
        setIsInited(true)
    }, [dispatch]);

    const userProjects = useSelector(getProjectUserProjects)
    const isFirstCallFetchUserProjects = useSelector(getIsFirstFetchUserProject)

    useEffect(() => {
        if (!userProjects && isFirstCallFetchUserProjects) {
            dispatch(FetchUserProjects())
        }
    }, [dispatch, isFirstCallFetchUserProjects, userProjects]);

    if (isInited) {
        return (
            <div className={'App'}>
                <Suspense>
                    <AppRouter/>
                </Suspense>
                <LoadingLine/>
            </div>
        )
    }

    return (
        <></>
    )
}