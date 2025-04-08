import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectDataInterface, ProjectSliceSchema} from "../types/projectSliceSchema.ts";

const initialState: ProjectSliceSchema = {
    fetchUserProjectIsLoading: false,
    isFirstFetchUserProject: true,
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

    }
})

export const {actions: ProjectActions} = ProjectSlice;
export const {reducer: ProjectReducer} = ProjectSlice;