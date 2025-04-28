import {newBoardSliceSchema} from "../types/newBoardSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createNewBoardService} from "../services/createNewBoardService.ts";


const initialState: newBoardSliceSchema = {
    isCreateBoardFetching: false,
    isCreateBoardModalOpen: false
};

export const newBoardSlice = createSlice({
    name: 'newBoard',
    initialState,
    reducers: {
        setCreateBoardModalOpen: (state: newBoardSliceSchema, action: PayloadAction<boolean>) => {
            state.isCreateBoardModalOpen = action.payload;
        }
    },
    extraReducers: (builder ) => {
        builder
            .addCase(createNewBoardService.pending, (state: newBoardSliceSchema) => {
                state.isCreateBoardFetching = true;
            })
            .addCase(createNewBoardService.fulfilled, (state: newBoardSliceSchema) => {
                state.isCreateBoardFetching = false;
            })
            .addCase(createNewBoardService.rejected, (state: newBoardSliceSchema) => {
                state.isCreateBoardFetching = false;
            })
    },
});

export const { actions: newBoardSliceActions } = newBoardSlice;
export const { reducer: newBoardSliceReducer } = newBoardSlice;