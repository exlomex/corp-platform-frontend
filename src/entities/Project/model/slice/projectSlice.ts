import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectDataInterface, ProjectSliceSchema, SelectedProjectInterface} from "../types/projectSliceSchema.ts";
import {DeleteUserProjectById} from "@/entities/Project/model/services/deleteUserProjectById.ts";
import {LOCAL_STORAGE_SELECTED_PROJECT} from "@/shared/const/localstorage.ts";

const initialState: ProjectSliceSchema = {
    fetchUserProjectIsLoading: false,
    isFirstFetchUserProject: true,
    isDeleteProjectFetching: false,
}

export const ProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setSelectedProject: (state: ProjectSliceSchema, action: PayloadAction<SelectedProjectInterface>) => {
            state.selectedProject = action.payload;
        },
        initProjects: (state: ProjectSliceSchema) => {
            if (state.userProjects.length) {
                const selectedProjectFromStorage: SelectedProjectInterface = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT))
                console.log(selectedProjectFromStorage);
                if (selectedProjectFromStorage) {
                    const isHasSelectedProject = (state.userProjects.some(project => {
                        return project.title === selectedProjectFromStorage.title;
                    }))

                    if (isHasSelectedProject) {
                        state.selectedProject = selectedProjectFromStorage;
                    } else {
                        localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT)

                    }

                } else {
                    console.log(131);

                    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT, JSON.stringify({
                        title: state.userProjects[0].title,
                        id: state.userProjects[0].id
                    }))
                }
            }
        },

        setUserProjects: (state: ProjectSliceSchema, action: PayloadAction<ProjectDataInterface[]>) => {
            state.userProjects = action.payload;
        },
        setIsFirstFetchUserProject: (state: ProjectSliceSchema, action: PayloadAction<boolean>) => {
            state.isFirstFetchUserProject = action.payload
        },
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