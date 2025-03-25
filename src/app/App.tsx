import {Suspense, useEffect} from "react";
import {AppRouter} from "@/app/providers/Router";
import {$api} from "@/shared/api/api.ts";

export const App = () => {
    const checkHealth = async () => {
        try {
            return await $api.get('/health')
        } catch (e) {
            console.error(e);
        }
    }

    // useEffect(() => {
    //     checkHealth().then(r => console.log(r.data))
    // }, []);

    return (
        <div className={'App'}>
            <Suspense>
                <AppRouter/>
            </Suspense>
        </div>
    )
}