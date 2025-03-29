import {createSelector} from "@reduxjs/toolkit";
import {getUser} from "@/entities/User/model/selectors/getUser.ts";
import {UserSliceSchema} from "@/entities/User";

export const getUserIsAuth = createSelector(getUser, (state: UserSliceSchema) => state.isAuth)
export const getUserRole = createSelector(getUser, (state: UserSliceSchema) => state.role)
export const getUserLoginError = createSelector(getUser, (state: UserSliceSchema) => state.isLoginError)
export const getUserLoginIsFetching = createSelector(getUser, (state: UserSliceSchema) => state.isLoginFetching)