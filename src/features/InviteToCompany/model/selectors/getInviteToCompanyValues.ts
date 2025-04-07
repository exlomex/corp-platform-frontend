import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {inviteToCompanySliceSchema} from "../types/inviteToCompanySliceSchema.ts";

export const getInviteToCompany = (state: StateSchema) => state.inviteToCompany

export const getInviteToCompanyIsFetching = createSelector(getInviteToCompany, (state: inviteToCompanySliceSchema) => state.isInviteToCompanyFetching)
export const getInviteToCompanyIsError = createSelector(getInviteToCompany, (state: inviteToCompanySliceSchema) => state.isInviteToCompanyError)