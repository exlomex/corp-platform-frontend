import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {newBoardSliceSchema} from "../types/newBoardSliceSchema.ts";

export const newBoardValues = (state: StateSchema) => state.newBoard

export const getIsCreateNewBoardFetching = createSelector(newBoardValues,
    (state: newBoardSliceSchema) => state.isCreateBoardFetching)
export const getIsCreateNewBoardModalOpen = createSelector(newBoardValues,
    (state: newBoardSliceSchema) => state.isCreateBoardModalOpen
)