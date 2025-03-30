import {RegistrationSliceSchema} from "../types/registrationSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {checkInvitationCode} from "../services/checkInvitationCode.ts";

const initialState: RegistrationSliceSchema = {
    InvitationCodeIsFetching: false,
    InvitationCodeIsActivate: false
};

export const RegistrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
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
    },
});

export const { actions: RegistrationSliceActions } = RegistrationSlice;
export const { reducer: RegistrationSliceReducer } = RegistrationSlice;