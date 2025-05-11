import {createSelector} from "@reduxjs/toolkit";
import {getUser} from "@/entities/User/model/selectors/getUser.ts";
import {UserSliceSchema} from "@/entities/User";

export const getUserIsAuth = createSelector(getUser, (state: UserSliceSchema) => state.isAuth)
export const getUserRole = createSelector(getUser, (state: UserSliceSchema) => state.role)
export const getUserLoginError = createSelector(getUser, (state: UserSliceSchema) => state.isLoginError)
export const getUserLoginIsFetching = createSelector(getUser, (state: UserSliceSchema) => state.isLoginFetching)
export const getUserIsFetching = createSelector(getUser, (state: UserSliceSchema) => state.isUserFetching)
export const getUserInfo = createSelector(getUser, (state: UserSliceSchema) => state.userInfo)
export const getUserCompanyId = createSelector(getUser, (state: UserSliceSchema) => state.companyId)
export const getUserIsUserFetched = createSelector(getUser, (state: UserSliceSchema) => state.isUserFetched)
export const getUserCompanyUsers = createSelector(getUser, (state: UserSliceSchema) => state.companyUsers)
export const getUserAsideIsCollapsed = createSelector(getUser, (state: UserSliceSchema) => state.AsideIsCollapsed)
export const getUserImageError = createSelector(getUser, (state: UserSliceSchema) => state.profileImageError)
export const getUserImageIsFetching = createSelector(getUser, (state: UserSliceSchema) => state.profileImageIsFetching)
export const getEditPersonalDataIsFetching = createSelector(getUser, (state: UserSliceSchema) => state.profileEditDataIsFetching);
export const getEditPersonalDataError = createSelector(getUser, (state: UserSliceSchema) => state.profileEditDataError)

export const getEditPasswordIsFetching = createSelector(getUser, (state: UserSliceSchema) => state.profileEditPasswordIsFetching)
export const getEditPasswordError = createSelector(getUser, (state: UserSliceSchema) => state.profileEditPasswordError)