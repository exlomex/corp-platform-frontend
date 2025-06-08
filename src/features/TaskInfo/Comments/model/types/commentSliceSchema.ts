import {File} from "@/features/File";

export interface CommentI {
    id: number,
    text: string,
    author: {
        id: number,
        firstName: string,
        lastName: string
        imageUrl?: string
    },
    taskId: number,
    createdAt: Date
    files?: File[]
}

export interface CommentSliceSchema {
    taskComments?: CommentI[]
    taskCommentsIsFetching: boolean;
    taskCommentsIsFirstLoading: boolean;
}