import {Priority} from "../../const/priorityConsts.tsx";
import {File} from "@/features/File";

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
    storyPoints?: number;
    deadline?: string;
    files: File[]
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

export interface TaskSnapshots {
    id: number,
    userId: TaskUser;
    taskId: number,
    snapshot: TaskI
    version: number,
    modifiedDate: string,
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
    selectedTaskSnapshots?: TaskSnapshots[]

    taskNavigationHistory: string[],

    projectTreeTasks: TreeTask[],
    projectsTreeTasksIsFetching: boolean
    projectsTreeTasksIsFirstLoading: boolean
}