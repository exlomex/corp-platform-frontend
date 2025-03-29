import {AppRoutes, getRouteLogin, getRouteMain, getRouteRegister} from "@/shared/const/router.ts";
import {RouterProps} from "@/shared/types/router.ts";
import {LoginPage} from "@/pages/LoginPage";
import {UserRoles} from "@/entities/User";
import {RegisterPage} from "@/pages/RegisterPage";

export const RouterConfig: Record<AppRoutes, RouterProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        authOnly: true,
        roles: [UserRoles.USER],
        element: <RegisterPage/>
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage/>,
        guestOnly: true
    },
    [AppRoutes.REGISTER]: {
        path: getRouteRegister(),
        element: <RegisterPage/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: getRouteLogin(),
        element: <LoginPage/>
    },
}