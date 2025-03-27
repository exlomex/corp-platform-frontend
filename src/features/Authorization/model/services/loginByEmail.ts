import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginByEmailInputData, LoginByEmailReturnedData} from "../types/authTypes.ts";
import {UserSliceActions} from "@/entities/User";

export const loginByEmail = createAsyncThunk<
    LoginByEmailReturnedData,
    LoginByEmailInputData,
    ThunkConfig<string>
>('login/loginByEmail', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<LoginByEmailReturnedData>('/auth/login', authData);

        if (!response.data) {
            throw new Error();
        }

        dispatch(UserSliceActions.setAuth(response.data));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
