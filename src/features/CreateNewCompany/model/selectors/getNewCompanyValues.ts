import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {newCompanySliceSchema} from "@/features/CreateNewCompany";

export const getNewCompany = (state: StateSchema) => state.newCompany

export const getNewCompanyIsFetching = createSelector(getNewCompany, (state: newCompanySliceSchema) => state.isCreateCompanyFetching)