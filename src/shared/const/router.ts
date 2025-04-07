export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    REGISTER = 'register',
    COMPANY_CREATE = 'companyCreate',
    SETTINGS = 'settings',
    NOT_FOUND = '*'
}

export const getRouteMain = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteRegister = () => '/register';

export const getRouteSettings = (tab: string) => `/settings/${tab}`;

export const getRouteCompanyCreate = () => '/company/create'
