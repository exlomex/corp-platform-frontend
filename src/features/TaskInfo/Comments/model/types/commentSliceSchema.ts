export interface CommentI {
    id: number,
    text: string,
    author: {
        id: number,
        firstName: string,
        lastName: string
    },
    taskId: number,
    createdAt: Date
}

export interface CommentSliceSchema {
    taskComments?: CommentI[]
}