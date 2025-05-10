import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommentI, CommentSliceSchema} from "../types/commentSliceSchema.ts";


const initialState: CommentSliceSchema = {};

export const CommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        resetSlice: () => initialState,
        setTaskComments: (state: CommentSliceSchema, action: PayloadAction<CommentI[]>) => {
            state.taskComments = action.payload
        }
    },
});

export const { actions: CommentActions } = CommentSlice;
export const { reducer: CommentReducer } = CommentSlice;