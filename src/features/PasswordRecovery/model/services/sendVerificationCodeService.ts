import {ThunkConfig} from "@/app/providers/Store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {PasswordRecoveryActions} from "@/features/PasswordRecovery";

export interface sendVerificationCodeServiceInputData {
    email: string;
}

export const sendVerificationCodeService = createAsyncThunk<
    void,
    sendVerificationCodeServiceInputData,
    ThunkConfig<string>
>('/auth/verification-code', async (sendData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/auth/verification-code', sendData);

        if (response.status !== 200) {
            throw new Error('Ошибка отправки кода');
        }

        dispatch(PasswordRecoveryActions.setStep(2));
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response?.data || e.message || 'Unknown error');
    }
});
