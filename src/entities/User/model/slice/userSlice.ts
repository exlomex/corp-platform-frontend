import {tokenInfoTypes, UserI, UserRoles, UserSliceSchema} from "../types/userSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LOCAL_STORAGE_USER_TOKEN} from "@/shared/const/localstorage.ts";
import {jwtDecode} from "jwt-decode";
import {LoginByEmailReturnedData} from "@/features/Authorization/model/types/authTypes.ts";
import {loginByEmail} from "@/features/Authorization/model/services/loginByEmail.ts";
import {fetchUserInfo} from "@/features/ProfileTab/model/services/fetchUserInfo.ts";
import {addImageService} from "@/entities/User/model/services/addImageService.ts";
import {editPersonalDataService} from "@/entities/User/model/services/editPersonalDataService.ts";
import {editPasswordService} from "@/entities/User/model/services/editPasswordService.ts";


const initialState: UserSliceSchema = {
    isAuth: false,
    isLoginFetching: false,
    isUserFetching: false,
    isUserFetched: false,
    companyUsers: [],
    AsideIsCollapsed: false,
    profileEditDataIsFetching: false,
    profileEditPasswordIsFetching: false,
    profileImageIsFetching: false,
    projectUsers: []
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProjectUsers: (state: UserSliceSchema, action: PayloadAction<UserI[]>) => {
            state.projectUsers = action.payload;
        },
        setAsideIsCollapsed: (state: UserSliceSchema, action: PayloadAction<boolean>) => {
            state.AsideIsCollapsed = action.payload
        },
        resetUser: () => initialState,
        setCompanyUsers: (state: UserSliceSchema, action: PayloadAction<UserI[]>) => {
            state.companyUsers = action.payload;
        },
        setUserIsFetched: (state: UserSliceSchema, action: PayloadAction<boolean>) => {
            state.isUserFetched = action.payload;
        },
        setCompanyId: (state: UserSliceSchema, action) => {
            state.companyId = action.payload;
        },
        setAuth: (state: UserSliceSchema, action: PayloadAction<LoginByEmailReturnedData>) => {
            const accessToken = action.payload.accessToken
            state.isAuth = true;

            const tokenInfo: tokenInfoTypes = jwtDecode(accessToken || '')
            state.role = tokenInfo.role as UserRoles;

            localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, accessToken);
        },
        logout: (state: UserSliceSchema) => {
            state.isAuth = false;
            state.role = undefined;
            localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN);
        },
        initAuth: (state: UserSliceSchema) => {
            const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
            if (token) {
                const tokenInfo: tokenInfoTypes = jwtDecode(token || '')

                if (tokenInfo.exp) {
                    const currentDate = new Date()
                    const expTokenDate = new Date(tokenInfo.exp * 1000)

                    if (currentDate > expTokenDate) {
                        state.role = undefined;
                        state.isAuth = false;
                        localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN)
                    } else {
                        state.role = tokenInfo.role as UserRoles;
                        state.isAuth = true;
                    }
                }
            }
        },
        setUserInfo: (state: UserSliceSchema, action) => {
            state.userInfo = action.payload
        },
        setImageAddError: (state: UserSliceSchema) => {
            state.profileImageError = 'Ошибка при добавлении фото'
        }
    },
    extraReducers: (builder ) => {
        builder
            .addCase(loginByEmail.pending, (state: UserSliceSchema) => {
                state.isLoginError = undefined;
                state.isLoginFetching = true;
            })
            .addCase(loginByEmail.fulfilled, (state: UserSliceSchema) => {
                state.isLoginFetching = false;
            })
            .addCase(loginByEmail.rejected, (state: UserSliceSchema, action) => {
                state.isLoginFetching = false;
                state.isLoginError = action.payload;
            })
            .addCase(fetchUserInfo.pending, (state: UserSliceSchema) => {
                state.isUserFetching = true
            })
            .addCase(fetchUserInfo.fulfilled, (state: UserSliceSchema) => {
                state.isUserFetching = false
            })
            .addCase(fetchUserInfo.rejected, (state: UserSliceSchema) => {
                state.isUserFetching = false
            })
            // profileImage
            .addCase(addImageService.pending, (state: UserSliceSchema) => {
                state.profileImageError = undefined
                state.profileImageIsFetching = true
            })
            .addCase(addImageService.rejected, (state: UserSliceSchema, action) => {
                state.profileImageError = action.payload;
                state.profileImageIsFetching = false
            })
            .addCase(addImageService.fulfilled, (state: UserSliceSchema, action) => {
                state.profileImageIsFetching = false
            })
            // personal data
            .addCase(editPersonalDataService.pending, (state: UserSliceSchema) => {
                state.profileEditDataIsFetching = true
                state.profileEditDataError = undefined
            })
            .addCase(editPersonalDataService.fulfilled, (state: UserSliceSchema) => {
                state.profileEditDataIsFetching = false
            })
            .addCase(editPersonalDataService.rejected, (state: UserSliceSchema, action) => {
                state.profileEditDataIsFetching = false
                state.profileEditDataError = action.payload
            })
            // password
            .addCase(editPasswordService.pending, (state: UserSliceSchema) => {
                state.profileEditPasswordIsFetching = true
                state.profileEditPasswordError = undefined
            })
            .addCase(editPasswordService.fulfilled, (state: UserSliceSchema) => {
                state.profileEditPasswordIsFetching = false
            })
            .addCase(editPasswordService.rejected, (state: UserSliceSchema, action) => {
                state.profileEditPasswordIsFetching = false
                state.profileEditPasswordError = action.payload
            })
    },
});

export const { actions: UserSliceActions } = UserSlice;
export const { reducer: UserSliceReducer } = UserSlice;