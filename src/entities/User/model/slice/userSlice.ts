import {tokenInfoTypes, UserRoles, UserSliceSchema} from "../types/userSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LOCAL_STORAGE_USER_TOKEN} from "@/shared/const/localstorage.ts";
import {jwtDecode} from "jwt-decode";
import {LoginByEmailReturnedData} from "@/features/Authorization/model/types/authTypes.ts";


const initialState: UserSliceSchema = {
    isAuth: false,
    role: UserRoles.GUEST
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
        // logout: (state: UserSliceSchema) => {
        //     state.isAuth = false;
        //     state.role = UserRoles.GUEST;
        //     localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
        // },
        initAuth: (state: UserSliceSchema) => {
            const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
            if (token) {

                const tokenInfo: tokenInfoTypes = jwtDecode(token || '')

                if (tokenInfo.exp) {
                    const currentDate = new Date()
                    const expTokenDate = new Date(tokenInfo.exp)

                    if (currentDate > expTokenDate) {
                        state.role = UserRoles.GUEST;
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
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.loginError = undefined;
    //             state.loginIsLoading = true;
    //         })
    //         .addCase(loginByUsername.fulfilled, (state) => {
    //             state.loginIsLoading = false;
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.loginIsLoading = false;
    //             state.loginError = action.payload;
    //         })
    // },
});

export const { actions: UserSliceActions } = UserSlice;
export const { reducer: UserSliceReducer } = UserSlice;