import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectDataInterface, ProjectSliceSchema} from "../types/projectSliceSchema.ts";
import {DeleteUserProjectById} from "@/entities/Project/model/services/deleteUserProjectById.ts";

const initialState: ProjectSliceSchema = {
    fetchUserProjectIsLoading: false,
    isFirstFetchUserProject: true,
    isDeleteProjectFetching: false
}

export const ProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setUserProjects: (state: ProjectSliceSchema, action: PayloadAction<ProjectDataInterface[]>) => {
            state.userProjects = action.payload;
        },
        setIsFirstFetchUserProject: (state: ProjectSliceSchema, action: PayloadAction<boolean>) => {
            state.isFirstFetchUserProject = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(DeleteUserProjectById.pending, (state: ProjectSliceSchema) => {
                state.isDeleteProjectFetching = true;
            })
            .addCase(DeleteUserProjectById.rejected, (state: ProjectSliceSchema) => {
                state.isDeleteProjectFetching = false;
            })
            .addCase(DeleteUserProjectById.fulfilled, (state: ProjectSliceSchema) => {
                state.isDeleteProjectFetching = false;
            })
    }
})

export const {actions: ProjectActions} = ProjectSlice;
export const {reducer: ProjectReducer} = ProjectSlice;