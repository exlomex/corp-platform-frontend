import {JwtPayload} from "jwt-decode";

export enum UserRoles {
    // GUEST = 'GUEST',
    ADMIN = 'ADMIN',
    USER = 'USER',
    COMPANY_OWNER = 'COMPANY_OWNER'
}

export interface UserI {
    id: number,
    firstName: string,
    lastName: string,
    role: UserRoles,
    companyId: number;
    imageUrl?: string
    email: string
}

export interface UserSliceSchema {
    isAuth: boolean;
    role?: UserRoles;
    companyId?: number
    userInfo?: UserI

    // login
    isLoginError?: string;
    isLoginFetching: boolean

    // userFetching
    isUserFetching: boolean
    isUserFetched: boolean

    // companyUsers
    companyUsers: UserI[]

    // aside menu collapsed
    AsideIsCollapsed: boolean

    // profileImageError
    profileImageError?: string
    profileImageIsFetching: boolean

    // profile edit PersonalData
    profileEditDataIsFetching: boolean;
    profileEditDataError?: string;

    profileEditPasswordIsFetching: boolean;
    profileEditPasswordError?: string;
}

export interface tokenInfoTypes extends JwtPayload {
    id: number,
    // username: string,
    // role: Exclude<keyof typeof UserRoles, 'GUEST'>,
    role: UserRoles,
}