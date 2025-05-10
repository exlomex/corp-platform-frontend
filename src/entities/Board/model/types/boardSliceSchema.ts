export interface BoardInterface {
    id: number,
    title: string,
    projectId: number,
}

export interface BoardSliceSchema {
    userBoardsBySelectedProject: BoardInterface[]

    isUserBoardsFetching: boolean;
    isUserBoardsFirstLoading: boolean;

    createNewTaskBoardsBySelectedProject: BoardInterface[]
}