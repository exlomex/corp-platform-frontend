import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommentI, CommentSliceSchema} from "../types/commentSliceSchema.ts";
import {FetchCommentsService} from "../services/fetchCommentsService.ts";


const initialState: CommentSliceSchema = {
    taskCommentsIsFetching: false,
    taskCommentsIsFirstLoading: true,
};

export const CommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        resetSlice: () => initialState,
        setTaskComments: (state: CommentSliceSchema, action: PayloadAction<CommentI[]>) => {
            state.taskComments = action.payload
        },
        setTaskCommentsIsFirstLoading: (state: CommentSliceSchema, action: PayloadAction<boolean>) => {
            state.taskCommentsIsFirstLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchCommentsService.pending, (state) => {
                state.taskCommentsIsFetching = true
            })
            .addCase(FetchCommentsService.fulfilled, (state) => {
                state.taskCommentsIsFetching = false
            })
            .addCase(FetchCommentsService.rejected, (state, action) => {
                state.taskCommentsIsFetching = false;
            })
        }
});

export const { actions: CommentActions } = CommentSlice;
export const { reducer: CommentReducer } = CommentSlice;