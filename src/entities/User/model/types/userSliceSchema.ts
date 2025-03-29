import {JwtPayload} from "jwt-decode";

export enum UserRoles {
    // GUEST = 'GUEST',
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface UserSliceSchema {
    isAuth: boolean;
    role?: UserRoles;

    // login
    isLoginError?: string;
    isLoginFetching: boolean
}

export interface tokenInfoTypes extends JwtPayload {
    id: number,
    username: string,
    // role: Exclude<keyof typeof UserRoles, 'GUEST'>,
    role: UserRoles,
}