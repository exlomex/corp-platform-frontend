interface TaskUser {
    id: number,
    firstName: string,
    lastName: string,
}

export interface TaskI {
    id: number,
    uniqueTitle: string,
    title: string,
    description?: string,
    statusId?: number,
    projectId: number,
    boardId: number,
    author: TaskUser,
    assignee?: TaskUser,
}
export interface TaskSliceSchema {
    boardTasks: TaskI[]
}