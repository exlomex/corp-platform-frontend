import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {StatusSliceSchema} from "@/entities/Status";

export const getStatusValues = (state: StateSchema) => state.status;

export const getBoardStatuses = createSelector(getStatusValues, (state: StatusSliceSchema) => {
    return state.boardStatuses
})