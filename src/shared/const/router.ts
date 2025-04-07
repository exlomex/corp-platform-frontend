export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    REGISTER = 'register',
    COMPANY_CREATE = 'companyCreate',
    NOT_FOUND = '*'
}

export const getRouteMain = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteRegister = () => '/register';

export const getRouteCompanyCreate = () => '/company/create'
