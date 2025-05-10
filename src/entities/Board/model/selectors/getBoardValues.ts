import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {BoardSliceSchema} from "@/entities/Board";

export const getBoardValues = (state: StateSchema) => state.board;

export const getIsUserBoardsFetching = createSelector(getBoardValues, (state: BoardSliceSchema) => {
    return state.isUserBoardsFetching;
})

export const getIsUserBoardsFirstLoading = createSelector(getBoardValues, (state: BoardSliceSchema) => {
    return state.isUserBoardsFirstLoading;
})

export const getUserBoardsBySelectedProject = createSelector(getBoardValues, (state: BoardSliceSchema) => {
    return state.userBoardsBySelectedProject;
})

export const getCreateTaskBoardsBySelectedProject = createSelector(getBoardValues, (state: BoardSliceSchema) => {
    return state.createNewTaskBoardsBySelectedProject;
})