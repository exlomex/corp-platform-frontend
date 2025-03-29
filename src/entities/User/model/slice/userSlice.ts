import {tokenInfoTypes, UserRoles, UserSliceSchema} from "../types/userSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LOCAL_STORAGE_USER_TOKEN} from "@/shared/const/localstorage.ts";
import {jwtDecode} from "jwt-decode";
import {LoginByEmailReturnedData} from "@/features/Authorization/model/types/authTypes.ts";
import {loginByEmail} from "@/features/Authorization/model/services/loginByEmail.ts";
import {StateSchema} from "@/app/providers/Store";
import {c} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";


const initialState: UserSliceSchema = {
    isAuth: false,
    isLoginFetching: false
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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
    },
});

export const { actions: UserSliceActions } = UserSlice;
export const { reducer: UserSliceReducer } = UserSlice;