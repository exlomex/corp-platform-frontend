import {RegistrationSliceSchema} from "../types/registrationSliceSchema.ts";
import {createSlice} from "@reduxjs/toolkit";
import {checkInvitationCode} from "../services/checkInvitationCode.ts";

const initialState: RegistrationSliceSchema = {
    InvitationCodeIsFeching: false
};

export const RegistationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        init: () => {}
    },
    extraReducers: (builder ) => {
        builder
            .addCase(checkInvitationCode.pending, (state: RegistrationSliceSchema) => {
                state.InvitationCodeIsError = undefined;
                state.InvitationCodeIsFeching = true;
            })
            .addCase(checkInvitationCode.fulfilled, (state: RegistrationSliceSchema) => {
                state.InvitationCodeIsFeching = false;
            })
            .addCase(checkInvitationCode.rejected, (state: RegistrationSliceSchema, action) => {
                state.InvitationCodeIsFeching = false;
                state.InvitationCodeIsError = action.payload;
            })
    },
});

export const { actions: RegistationSliceActions } = RegistationSlice;
export const { reducer: RegistationSliceReducer } = RegistationSlice;