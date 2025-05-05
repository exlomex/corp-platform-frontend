import {StatusI, StatusSliceSchema} from "../types/statusSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: StatusSliceSchema = {
    boardStatuses: []
}

export const StatusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setBoardStatuses: (state: StatusSliceSchema, action: PayloadAction<StatusI[]>) => {
            state.boardStatuses = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(DeleteUserProjectById.pending, (state: ProjectSliceSchema) => {
    //             state.isDeleteProjectFetching = true;
    //         })
    //         .addCase(DeleteUserProjectById.rejected, (state: ProjectSliceSchema) => {
    //             state.isDeleteProjectFetching = false;
    //         })
    //         .addCase(DeleteUserProjectById.fulfilled, (state: ProjectSliceSchema) => {
    //             state.isDeleteProjectFetching = false;
    //         })
    // }
})

export const {actions: StatusActions} = StatusSlice;
export const {reducer: StatusReducer} = StatusSlice;