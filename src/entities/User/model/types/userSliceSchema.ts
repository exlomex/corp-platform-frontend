import {JwtPayload} from "jwt-decode";

export enum UserRoles {
    // GUEST = 'GUEST',
    ADMIN = 'ADMIN',
    USER = 'USER',
    COMPANY_OWNER = 'COMPANY_OWNER'
}

export interface UserSliceSchema {
    isAuth: boolean;
    role?: UserRoles;
    firstName?: string;
    companyId?: number

    // login
    isLoginError?: string;
    isLoginFetching: boolean

    // userFetching
    isUserFetching: boolean
    isUserFetched: boolean
}

export interface tokenInfoTypes extends JwtPayload {
    id: number,
    // username: string,
    // role: Exclude<keyof typeof UserRoles, 'GUEST'>,
    role: UserRoles,
}