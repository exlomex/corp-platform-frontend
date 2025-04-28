import {
    AppRoutes,
    getRouteCompanyCreate,
    getRouteLogin,
    getRouteMain, getRouteProjectBoard, getRouteProjects,
    getRouteRegister, getRouteSettings
} from "@/shared/const/router.ts";
import {RouterProps} from "@/shared/types/router.ts";
import {LoginPage} from "@/pages/LoginPage";
import {UserRoles} from "@/entities/User";
import {RegisterPage} from "@/pages/RegisterPage";
import {TasksPage} from "@/pages/TasksPage";
import {CreateCompany} from "@/pages/CreateCompany";
import {SettingsPage} from "@/pages/SettingsPage";
import {ProjectsPage} from "@/pages/ProjectsPage";
import {ProjectBoardPage} from "@/pages/ProjectBoardPage";

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
        roles: [UserRoles.USER],
        element: <CreateCompany/>
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(':tab'),
        authOnly: true,
        roles: [UserRoles.USER, UserRoles.COMPANY_OWNER],
        element: <SettingsPage/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: getRouteLogin(),
        element: <LoginPage/>
    },
    [AppRoutes.PROJECTS]: {
        path: getRouteProjects(),
        element: <ProjectsPage/>,
        authOnly: true,
        roles: [UserRoles.USER, UserRoles.COMPANY_OWNER],
    },
    [AppRoutes.PROJECT_BOARD]: {
        path: getRouteProjectBoard(':project', ':board'),
        element: <ProjectBoardPage/>,
        authOnly: true,
        roles: [UserRoles.USER, UserRoles.COMPANY_OWNER],
    }
}