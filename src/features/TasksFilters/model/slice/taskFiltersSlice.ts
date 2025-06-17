import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TaskFiltersSliceSchema} from "../types/taskFiltersSliceSchema.ts";

const initialState: TaskFiltersSliceSchema = {
    selectedBoardsIds: [],
    selectedResolution: [],
    selectedAuthorIds: [],
    selectedAssigneeIds: [],
    searchQuery: '',
    selectedPriority: [],
    deadlineFrom: null,
    deadlineTo: null,
    storyPointsFrom: '',
    storyPointsTo: '',
};

export const TaskFiltersSlice = createSlice({
    name: 'taskFilters',
    initialState,
    reducers: {
        setSelectedBoardsIds: (state, action: PayloadAction<(string | number)[]>) => {
            state.selectedBoardsIds = action.payload;
        },
        setSelectedResolution: (state, action: PayloadAction<(string | number)[]>) => {
            state.selectedResolution = action.payload;
        },
        setSelectedAuthorIds: (state, action: PayloadAction<(string | number)[]>) => {
            state.selectedAuthorIds = action.payload;
        },
        setSelectedAssigneeIds: (state, action: PayloadAction<(string | number)[]>) => {
            state.selectedAssigneeIds = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSelectedPriority: (state, action: PayloadAction<(string | number)[]>) => {
            state.selectedPriority = action.payload;
        },
        setDeadlineFrom: (state, action: PayloadAction<Date | null>) => {
            state.deadlineFrom = action.payload;
        },
        setDeadlineTo: (state, action: PayloadAction<Date | null>) => {
            state.deadlineTo = action.payload;
        },
        setStoryPointsFrom: (state, action: PayloadAction<string>) => {
            state.storyPointsFrom = action.payload;
        },
        setStoryPointsTo: (state, action: PayloadAction<string>) => {
            state.storyPointsTo = action.payload;
        },
        resetAllFilters: () => initialState,
    }
});

export const { actions: taskFiltersActions } = TaskFiltersSlice;
export const { reducer: taskFiltersReducer } = TaskFiltersSlice;