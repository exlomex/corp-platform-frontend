import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {newProjectSliceSchema} from "../types/newProjectSliceSchema.ts";

export const newProjectValues = (state: StateSchema) => state.newProject

export const getIsCreateNewProjectFetching = createSelector(newProjectValues,
    (state: newProjectSliceSchema) => state.isCreateProjectFetching)
export const getIsCreateNewProjectModalOpen = createSelector(newProjectValues,
    (state: newProjectSliceSchema) => state.isCreateProjectModalOpen
)