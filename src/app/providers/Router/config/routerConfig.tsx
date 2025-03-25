import {AppRoutes, getRouteLogin, getRouteMain} from "@/shared/const/router.ts";
import {RouterProps} from "@/shared/types/router.ts";
import {App} from "@/app/App.tsx";
import {LoginPage} from "@/pages/LoginPage";

type AtLeastOne<T> = { [K in keyof T]: Pick<T, K> & Partial<Omit<T, K>> }[keyof T]; // TODO ИЗМЕНИТЬ ДЛЯ ПОДДЕРЖКИ ТИПОВ

export const RouterConfig: Record<AppRoutes, RouterProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        authOnly: true,
        element: <LoginPage/>
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage/>
    },
    [AppRoutes.REGISTER]: {
        path: getRouteLogin(),
        element: <LoginPage/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: getRouteLogin(),
        element: <LoginPage/>
    },
}