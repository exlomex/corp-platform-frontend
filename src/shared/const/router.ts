export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    REGISTER = 'register',
    COMPANY_CREATE = 'companyCreate',
    SETTINGS = 'settings',
    NOT_FOUND = '*',
    PROJECTS = 'projects',
    PROJECT_BOARD = 'projectBoard',
    PASSWORD_RECOVERY = 'passwordRecovery',
    BOARDS = 'boards',
    MESSAGES = 'messages'
}

export const getRouteMain = () => '/tasks';
export const getRouteLogin = () => '/login';
export const getRouteRegister = () => '/register';
export const getRouteSettings = (tab: string) => `/settings/${tab}`;
export const getRouteCompanyCreate = () => '/company/create'
export const getRouteProjects = () => '/projects'

export const getRouteProjectBoard = (project: string, board: string) => `/projects/${project}/boards/${board}`;

export const getRoutePasswordRecovery = () => '/recovery'

export const getRouteBoards = (project: string) => `/boards/${project}`
export const getRouteMessages = () => `/messages`
