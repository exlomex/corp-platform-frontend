export interface StatusI {
    id: number,
    title: string,
    boardId: number,
    order: number
}

export interface StatusSliceSchema {
    boardStatuses: StatusI[]

    selectedTaskBoardStatuses: StatusI[]
}