export interface StatusI {
    id: number,
    title: string,
    boardId: number,
}

export interface StatusSliceSchema {
    boardStatuses: StatusI[]
}