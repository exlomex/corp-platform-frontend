import {
    AppRoutes,
    getRouteCompanyCreate,
    getRouteLogin,
    getRouteMain,
    getRouteRegister
} from "@/shared/const/router.ts";
import {RouterProps} from "@/shared/types/router.ts";
import {LoginPage} from "@/pages/LoginPage";
import {UserRoles} from "@/entities/User";
import {RegisterPage} from "@/pages/RegisterPage";
import {TasksPage} from "@/pages/TasksPage";
import {CreateCompany} from "@/pages/CreateCompany";

export const RouterConfig: Record<AppRoutes, RouterProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        authOnly: true,
        roles: [UserRoles.USER, UserRoles.COMPANY_OWNER],
        element: <TasksPage/>
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage/>,
        guestOnly: true,
    },
    [AppRoutes.REGISTER]: {
        path: getRouteRegister(),
        element: <RegisterPage/>,
        guestOnly: true,
    },
    [AppRoutes.COMPANY_CREATE]: {
      path: getRouteCompanyCreate(),
      authOnly: true,
      element: <CreateCompany/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: getRouteLogin(),
        element: <LoginPage/>
    },
}