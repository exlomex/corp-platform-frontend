import {RouteProps} from "react-router";
import {UserRoles} from "@/entities/User";

export type RouterProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
    guestOnly?: boolean;
}