import {ThunkConfig} from "@/app/providers/Store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {PasswordRecoveryActions} from "@/features/PasswordRecovery";
import {UserSliceActions} from "@/entities/User";

export interface changePasswordServiceInputData {
    code: string;
    password: string;
    confirmPassword: string;
}

export interface changePasswordServiceReturnedData {
    accessToken: string;
}

export const changePasswordService = createAsyncThunk<
    changePasswordServiceReturnedData,
    changePasswordServiceInputData,
    ThunkConfig<string>
>('/auth/recovery-password', async (sendData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/auth/recovery-password', sendData);

        if (response.status !== 200) {
            throw new Error('Ошибка смены пароля');
        }

        dispatch(UserSliceActions.setAuth(response.data));
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response?.data || e.message || 'Unknown error');
    }
});
