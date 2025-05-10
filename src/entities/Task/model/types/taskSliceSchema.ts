interface TaskUser {
    id: number,
    firstName: string,
    lastName: string,
    imageUrl?: string
}

export interface subTaskI {
    id: number;
    statusTitle: string;
    title: string;
    uniqueTitle: string;
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
    updatedAt?: Date;
    subtasks: subTaskI[],
    parent?: subTaskI
}
export interface TaskSliceSchema {
    boardTasks: TaskI[]

    addSubTaskModalIsOpen: boolean;
    addSubTaskSelectedTask?: {
        id: number;
        uniqueTitle: string;
    };
    addSubTaskError?: string;

    addTaskModalIsActive: boolean;

    taskInfoModalIsOpen: boolean;
    selectedTaskInfo?: TaskI
    selectedTaskUniqueTitle?: string,
    selectedTaskInfoIsFetching: boolean;

    taskNavigationHistory: string[],
}