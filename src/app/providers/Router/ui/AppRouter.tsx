import {Route, Routes} from "react-router";
import {RouterProps} from "@/shared/types/router.ts";
import {RouterConfig} from "@/app/providers/Router/config/routerConfig.tsx";
import {useCallback} from "react";
import {RequireAuth} from "@/app/providers/Router/ui/RequireAuth.tsx";

export const AppRouter = () => {
    const routeWrapper = useCallback((route: RouterProps) => (
        <Route
            key={route.path}
            element={
                route?.authOnly
                    ? (<RequireAuth roles={route.roles}>{route.element}</RequireAuth>)
                    : route.guestOnly
                        ? (<RequireAuth guestOnly>{route.element}</RequireAuth>)
                        : route.element
            }
            path={route.path}
        />
    ), [])

    return (
        <Routes>{Object.values(RouterConfig).map(route => (routeWrapper(route)))}</Routes>
    )
}