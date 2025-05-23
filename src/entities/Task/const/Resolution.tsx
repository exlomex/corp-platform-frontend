

export type ResolutionKeys = keyof typeof Resolution;
export enum Resolution {
    OPEN = 'Открыта',
    ACTIVE = 'В работе',
    DONE = 'Закрыта',
    ARCHIVED = 'Архивирована',
}