import {Suspense, useEffect, useState} from "react";
import {AppRouter} from "@/app/providers/Router";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {UserSliceActions} from "@/entities/User";
import {LoadingLine} from "@/shared/ui/LoadingLine";

export const App = () => {
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
                <LoadingLine/>
            </div>
        )
    }

    return (
        <></>
    )
}