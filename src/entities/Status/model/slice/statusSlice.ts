import {StatusI, StatusSliceSchema} from "../types/statusSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskSliceSchema} from "@/entities/Task";


const initialState: StatusSliceSchema = {
    boardStatuses: [],
    selectedTaskBoardStatuses: []
}

export const StatusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setSelectedTaskBoardStatuses: (state: StatusSliceSchema, action: PayloadAction<StatusI[]>) => {
            state.selectedTaskBoardStatuses = action.payload;
        },
        setBoardStatuses: (state: StatusSliceSchema, action: PayloadAction<StatusI[]>) => {
            state.boardStatuses = action.payload;
        },
        changeStatusOrder: (state: StatusSliceSchema, action: PayloadAction<
            {overStatusId: number, activeStatusId: number, oldStatusOrder: number, newStatusOrder: number}
        > ) => {
            const {overStatusId,activeStatusId,oldStatusOrder,newStatusOrder} = action.payload

            if (state.boardStatuses.length) {
                state.boardStatuses = state.boardStatuses.map(boardStatus => {
                    if (boardStatus.id === activeStatusId) {
                        return { ...boardStatus, order: newStatusOrder };
                    }

                    if (oldStatusOrder < newStatusOrder) {
                        if (boardStatus.order <= newStatusOrder && boardStatus.order > oldStatusOrder) {
                            return {
                                ...boardStatus,
                                order: boardStatus.order - 1
                            };
                        }
                    }

                    if (oldStatusOrder > newStatusOrder) {
                        if (boardStatus.order >= newStatusOrder && boardStatus.order < oldStatusOrder) {
                            return {
                                ...boardStatus,
                                order: boardStatus.order + 1
                            };
                        }
                    }

                    return boardStatus;
                });

            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(DeleteUserProjectById.pending, (state: ProjectSliceSchema) => {
    //             state.isDeleteProjectFetching = true;
    //         })
    //         .addCase(DeleteUserProjectById.rejected, (state: ProjectSliceSchema) => {
    //             state.isDeleteProjectFetching = false;
    //         })
    //         .addCase(DeleteUserProjectById.fulfilled, (state: ProjectSliceSchema) => {
    //             state.isDeleteProjectFetching = false;
    //         })
    // }
})

export const {actions: StatusActions} = StatusSlice;
export const {reducer: StatusReducer} = StatusSlice;