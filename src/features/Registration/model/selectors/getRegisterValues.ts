import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {RegistrationSliceSchema} from "@/features/Registration";

export const getRegisterSlice = (state: StateSchema) => state.registration

export const getRegisterInvitationCodeIsFeching = createSelector(getRegisterSlice, (state: RegistrationSliceSchema) => {
    return state.InvitationCodeIsFeching
})

export const getRegisterInvitationCodeIsError = createSelector(getRegisterSlice, (state: RegistrationSliceSchema) => {
    return state.InvitationCodeIsError
})