import {Route, Routes} from "react-router";
import {RouterProps} from "@/shared/types/router.ts";
import {RouterConfig} from "@/app/providers/Router/config/routerConfig.tsx";
import {useCallback} from "react";

export const AppRouter = () => {
    const routeWrapper = useCallback((route: RouterProps) => (
        <Route
            key={route.path}
            element={route.element}
            path={route.path}
        />
    ), [])

    return (
        <Routes>{Object.values(RouterConfig).map(route => (routeWrapper(route)))}</Routes>
    )
}