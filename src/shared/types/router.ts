import {RouteProps} from "react-router";

export type RouterProps = RouteProps & {
    authOnly?: boolean;
    // roles;

}