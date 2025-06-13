import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectDataInterface, ProjectSliceSchema, SelectedProjectInterface} from "../types/projectSliceSchema.ts";
import {DeleteUserProjectById} from "@/entities/Project/model/services/deleteUserProjectById.ts";
import {LOCAL_STORAGE_SELECTED_PROJECT} from "@/shared/const/localstorage.ts";
import {UserI} from "@/entities/User";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";

const initialState: ProjectSliceSchema = {
    fetchUserProjectIsLoading: false,
    isFirstFetchUserProject: true,

    isDeleteProjectFetching: false,
    settingsProjectUsers: [],
    addUserToProjectModalIsOpen: false,
    settingsSelectedProject: null,
    editProjectTitleModalIsOpen: false,
    editProjectInitialData: null
}

export const ProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        resetProjects: () => initialState,
        setSettingsSelectedProject: (state: ProjectSliceSchema, action: PayloadAction<ComboBoxOption>) => {
            state.settingsSelectedProject = action.payload;
        },
        setAddUserToProjectModalIsOpen: (state: ProjectSliceSchema, action: PayloadAction<boolean>) => {
            state.addUserToProjectModalIsOpen = action.payload;
        },
        setEditProjectTitleModalIsOpen: (state: ProjectSliceSchema, action: PayloadAction<boolean>) => {
            state.editProjectTitleModalIsOpen = action.payload;
        },
        setEditProjectInitialData: (state: ProjectSliceSchema, action: PayloadAction<ProjectSliceSchema['editProjectInitialData']>) => {
            state.editProjectInitialData = action.payload;
        },
        setSettingProjectUsers: (state: ProjectSliceSchema, action: PayloadAction<UserI[]>) => {
            state.settingsProjectUsers = action.payload;
        },
        setSelectedProject: (state: ProjectSliceSchema, action: PayloadAction<SelectedProjectInterface>) => {
            state.selectedProject = action.payload;
        },
        initProjects: (state: ProjectSliceSchema) => {
            const hasProjects = state.userProjects.length > 0;
            const shouldInit = hasProjects && !state.isFirstFetchUserProject;

            if (!shouldInit) {
                // localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT);
                state.selectedProject = undefined;
                return;
            }

            const getFirstProject = (): SelectedProjectInterface => ({
                title: state.userProjects[0].title,
                id: state.userProjects[0].id,
                projectKey: state.userProjects[0].shortName,
                ownerId: state.userProjects[0].ownerId,
            });

            const stored = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT);

            if (stored) {
                try {
                    const parsed: SelectedProjectInterface = JSON.parse(stored);
                    const exists = state.userProjects.some(p => p.title === parsed.title);

                    if (exists) {
                        state.selectedProject = parsed;
                        return;
                    } else {
                        localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT);
                        state.selectedProject = undefined;
                    }
                } catch (e) {
                    console.error('[initProjects] Failed to parse stored project:', e);
                    localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT);
                }
            }

            const fallback = getFirstProject();
            state.selectedProject = fallback;
            localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT, JSON.stringify(fallback));
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