import {Priority} from "../../const/priorityConsts.tsx";

export interface TaskUser {
    id: number,
    firstName: string,
    lastName: string,
    imageUrl?: string,
    allowedProjects: number[]
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
    createdAt?: Date;
    updatedAt?: Date;
    subtasks: subTaskI[],
    parent?: subTaskI
    priority?: Priority
}

export interface TreeTask {
    id: number,
    title: string,
    uniqueTitle: string,
    board: {
        id: number,
        title: string
    },
    status: {
        id: number,
        title: string,
        "resolution": "ACTIVE"
    },
    author: TaskUser,
    assignee: TaskUser,
    priority: Priority,
    parentId: number,
    children: TreeTask[] | []
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

    projectTreeTasks: TreeTask[],
    projectsTreeTasksIsFetching: boolean
    projectsTreeTasksIsFirstLoading: boolean
}