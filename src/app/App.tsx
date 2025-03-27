import {Suspense, useEffect} from "react";
import {AppRouter} from "@/app/providers/Router";
import {getRouteLogin} from "@/shared/const/router.ts";
import {useNavigate} from "react-router";

export const App = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(getRouteLogin())
    }, [navigate]);

    return (
        <div className={'App'}>
            <Suspense>
                <AppRouter/>
            </Suspense>
        </div>
    )
}