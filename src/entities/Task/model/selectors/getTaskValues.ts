import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {TaskSliceSchema} from "../types/taskSliceSchema.ts";

const getTaskValues = (state: StateSchema) => state.task;

export const getBoardTasks = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.boardTasks
})

export const getAddSubTaskModalIsOpen = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.addSubTaskModalIsOpen
})

export const getAddTaskModalIsOpen = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.addTaskModalIsActive
})

export const getAddSubTaskSelectedTask = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.addSubTaskSelectedTask
})

export const getAddSubTaskError = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.addSubTaskError
})

export const getTaskInfoModalIsOpen = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.taskInfoModalIsOpen
})

export const getSelectedTaskInfo = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.selectedTaskInfo
})

export const getSelectedTaskUniqueTitle = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.selectedTaskUniqueTitle
})

export const getSelectedTaskInfoIsFetching = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.selectedTaskInfoIsFetching
})

export const getTaskNavigationHistory = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.taskNavigationHistory
})

export const getProjectTreeTasks = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.projectTreeTasks
})

export const getProjectsTreeTasksIsFetching = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.projectsTreeTasksIsFetching
})

export const getProjectsTreeTasksIsFirstLoading = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.projectsTreeTasksIsFirstLoading
})
