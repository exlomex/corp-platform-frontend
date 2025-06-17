import { createSelector } from '@reduxjs/toolkit';
import { TaskFiltersSliceSchema } from '../types/taskFiltersSliceSchema';
import {StateSchema} from "@/app/providers/Store";

export const getTaskFiltersState = (state: StateSchema): TaskFiltersSliceSchema => state.taskFilters;

export const getSelectedResolution = createSelector(
    getTaskFiltersState,
    (state) => state.selectedResolution
);

export const getSelectedAuthorIds = createSelector(
    getTaskFiltersState,
    (state) => state.selectedAuthorIds
);

export const getSelectedAssigneeIds = createSelector(
    getTaskFiltersState,
    (state) => state.selectedAssigneeIds
);

export const getSearchQuery = createSelector(
    getTaskFiltersState,
    (state) => state.searchQuery
);

export const getSelectedPriority = createSelector(
    getTaskFiltersState,
    (state) => state.selectedPriority
);

export const getDeadlineFrom = createSelector(
    getTaskFiltersState,
    (state) => state.deadlineFrom
);

export const getDeadlineTo = createSelector(
    getTaskFiltersState,
    (state) => state.deadlineTo
);

export const getStoryPointsFrom = createSelector(
    getTaskFiltersState,
    (state) => state.storyPointsFrom
);

export const getStoryPointsTo = createSelector(
    getTaskFiltersState,
    (state) => state.storyPointsTo
);

export const getSelectedBoardIds = createSelector(
    getTaskFiltersState,
    (state) => state.selectedBoardsIds
);
