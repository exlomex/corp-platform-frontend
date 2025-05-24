import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {ProjectSliceSchema} from "@/entities/Project/model/types/projectSliceSchema.ts";

export const getProject = (state: StateSchema) => state.projects;

export const getProjectUserProjects = createSelector(getProject, (state: ProjectSliceSchema) => {
    return state.userProjects
})

export const getProjectFetchUserProjectIsLoading = createSelector(getProject, (state: ProjectSliceSchema) => {
    return state.fetchUserProjectIsLoading
})
export const getIsFirstFetchUserProject = createSelector(getProject, (state: ProjectSliceSchema) => {
    return state.isFirstFetchUserProject
})
export const getProjectIsDeleteProjectFetching = createSelector(getProject, (state: ProjectSliceSchema) => {
    return state.isDeleteProjectFetching
})

export const getProjectSelectedProject = createSelector(getProject, (state: ProjectSliceSchema) => {
    return state.selectedProject
})

export const getSettingProjectUsers = createSelector(getProject, (state: ProjectSliceSchema) => {
    return state.settingsProjectUsers
})

export const getAddUserToProjectModalIsOpen = createSelector(getProject, (state: ProjectSliceSchema) => {
    return state.addUserToProjectModalIsOpen
})

export const getSettingsSelectedProject = createSelector(getProject, (state: ProjectSliceSchema) => {
    return state.settingsSelectedProject
})
