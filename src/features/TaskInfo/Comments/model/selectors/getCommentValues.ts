import {CommentSliceSchema} from "../types/commentSliceSchema.ts";
import {createSelector} from "@reduxjs/toolkit";
import {StateSchema} from "@/app/providers/Store";

export const getCommentValues = (state: StateSchema) => state.comment;

export const getTaskComments = createSelector(getCommentValues, (state: CommentSliceSchema) => {
    return state.taskComments;
})