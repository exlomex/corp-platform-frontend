import {RegistrationSliceSchema} from "../types/registrationSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {checkInvitationCode} from "../services/checkInvitationCode.ts";
import {RegisterByEmail} from "../services/registerByEmail.ts";
import {RegisterByInvitationKey} from "@/features/Registration/model/services/registerByInvitationKey.ts";

const initialState: RegistrationSliceSchema = {
    InvitationCodeIsFetching: false,
    InvitationCodeIsActivate: false,
    RegisterServiceIsFetching: false
};

export const RegistrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        resetRegistrationSlice: () => initialState,
        setInvitationCodeIsActivate: (state: RegistrationSliceSchema, action: PayloadAction<boolean>) => {
            state.InvitationCodeIsActivate = action.payload
        }
    },
    extraReducers: (builder ) => {
        builder
            .addCase(checkInvitationCode.pending, (state: RegistrationSliceSchema) => {
                state.InvitationCodeIsError = undefined;
                state.InvitationCodeIsFetching = true;
            })
            .addCase(checkInvitationCode.fulfilled, (state: RegistrationSliceSchema) => {
                state.InvitationCodeIsFetching = false;
            })
            .addCase(checkInvitationCode.rejected, (state: RegistrationSliceSchema, action) => {
                state.InvitationCodeIsFetching = false;
                state.InvitationCodeIsError = action.payload;
            })
            // register by email
            .addCase(RegisterByEmail.pending, (state: RegistrationSliceSchema) => {
                state.RegisterServiceIsFetching = true;
                state.RegisterServiceError = undefined;
            })
            .addCase(RegisterByEmail.fulfilled, (state: RegistrationSliceSchema) => {
                state.RegisterServiceIsFetching = false;
            })
            .addCase(RegisterByEmail.rejected, (state: RegistrationSliceSchema, action) => {
                state.RegisterServiceIsFetching = false;
                state.RegisterServiceError = action.payload;
            })
            // register by code
            .addCase(RegisterByInvitationKey.pending, (state: RegistrationSliceSchema) => {
                state.RegisterServiceIsFetching = true;
            })
            .addCase(RegisterByInvitationKey.fulfilled, (state: RegistrationSliceSchema) => {
                state.RegisterServiceIsFetching = false;
            })
            .addCase(RegisterByInvitationKey.rejected, (state: RegistrationSliceSchema, action) => {
                state.RegisterServiceIsFetching = false;
            })
    },
});

export const { actions: RegistrationSliceActions } = RegistrationSlice;
export const { reducer: RegistrationSliceReducer } = RegistrationSlice;