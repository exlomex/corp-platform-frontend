import {ReactNode} from "react";
import {getUserIsAuth, getUserRole, UserRoles} from "@/entities/User";
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router";
import {getRouteLogin, getRouteMain} from "@/shared/const/router.ts";

interface RequireAuthProps {
    children: ReactNode;
    roles?: UserRoles[];
    guestOnly?: boolean;
}

export const RequireAuth = (props: RequireAuthProps) => {
    const { children, roles, guestOnly } = props;
    const location = useLocation();

    const currentRole = useSelector(getUserRole)
    const auth = useSelector(getUserIsAuth)

    if (guestOnly && auth) {
        return <Navigate to={getRouteMain()}/>
    }

    if (!auth) {
        if (guestOnly) {
            return children
        } else {
            return <Navigate to={getRouteLogin()} state={{from: location}} replace/>
        }
    }

    if (!roles) {
        return children
    }

    const hasCurrentRole = roles.some(requiredRole  => currentRole === requiredRole)
    if (!hasCurrentRole) {
        return <Navigate to={getRouteLogin()} state={{from: location}} replace/> // TODO ForbiddenPage
    } else {
        return children
    }
};
