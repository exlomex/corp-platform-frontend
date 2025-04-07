import {newCompanySliceSchema} from "../types/newCompanySliceSchema.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createNewCompanyService} from "../services/createNewCompanyService.ts";


const initialState: newCompanySliceSchema = {
    isCreateCompanyFetching: false
};

export const newCompanySlice = createSlice({
    name: 'newCompany',
    initialState,
    reducers: {
        t: () => {}
    },
    extraReducers: (builder ) => {
        builder
            .addCase(createNewCompanyService.pending, (state: newCompanySliceSchema) => {
                state.isCreateCompanyFetching = true;
            })
            .addCase(createNewCompanyService.fulfilled, (state: newCompanySliceSchema) => {
                state.isCreateCompanyFetching = false;
            })
            .addCase(createNewCompanyService.rejected, (state: newCompanySliceSchema) => {
                state.isCreateCompanyFetching = false;
            })
    },
});

export const { actions: newCompanySliceActions } = newCompanySlice;
export const { reducer: newCompanySliceReducer } = newCompanySlice;