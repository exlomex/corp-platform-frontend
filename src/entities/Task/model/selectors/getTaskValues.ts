import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {TaskSliceSchema} from "../types/taskSliceSchema.ts";

const getTaskValues = (state: StateSchema) => state.task;

export const getBoardTasks = createSelector(getTaskValues, (state: TaskSliceSchema) => {
    return state.boardTasks
})