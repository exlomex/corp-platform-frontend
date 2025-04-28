import {newProjectSliceSchema} from "../types/newProjectSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createNewProjectService} from "../services/createNewProjectService.ts";


const initialState: newProjectSliceSchema = {
    isCreateProjectFetching: false,
    isCreateProjectModalOpen: false
};

export const newProjectSlice = createSlice({
    name: 'newProject',
    initialState,
    reducers: {
        setCreateProjectModalOpen: (state: newProjectSliceSchema, action: PayloadAction<boolean>) => {
            state.isCreateProjectModalOpen = action.payload;
        }
    },
    extraReducers: (builder ) => {
        builder
            .addCase(createNewProjectService.pending, (state: newProjectSliceSchema) => {
                state.isCreateProjectFetching = true;
            })
            .addCase(createNewProjectService.fulfilled, (state: newProjectSliceSchema) => {
                state.isCreateProjectFetching = false;
            })
            .addCase(createNewProjectService.rejected, (state: newProjectSliceSchema) => {
                state.isCreateProjectFetching = false;
            })
    },
});

export const { actions: newProjectSliceActions } = newProjectSlice;
export const { reducer: newProjectSliceReducer } = newProjectSlice;