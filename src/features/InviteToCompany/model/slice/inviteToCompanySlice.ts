import {inviteToCompanySliceSchema} from "../types/inviteToCompanySliceSchema.ts";
import {createSlice} from "@reduxjs/toolkit";
import {inviteToCompanyService} from "../services/inviteToCompanyService.ts";


const initialState: inviteToCompanySliceSchema = {
    isInviteToCompanyFetching: false
};

export const inviteToCompanySlice = createSlice({
    name: 'inviteToCompany',
    initialState,
    reducers: {
        clearError: (state: inviteToCompanySliceSchema ) => {state.isInviteToCompanyError = undefined}
    },
    extraReducers: (builder ) => {
        builder
            .addCase(inviteToCompanyService.pending, (state: inviteToCompanySliceSchema) => {
                state.isInviteToCompanyFetching = true;
                state.isInviteToCompanyError = undefined
            })
            .addCase(inviteToCompanyService.fulfilled, (state: inviteToCompanySliceSchema) => {
                state.isInviteToCompanyFetching = false;
                state.isInviteToCompanyError = 'Приглашение успешно отправлено'
            })
            .addCase(inviteToCompanyService.rejected, (state: inviteToCompanySliceSchema) => {
                state.isInviteToCompanyFetching = false;
                state.isInviteToCompanyError = 'Ошибка при отправке приглашения'
            })
    },
});

export const { actions: inviteToCompanyActions } = inviteToCompanySlice;
export const { reducer: inviteToCompanyReducer } = inviteToCompanySlice;