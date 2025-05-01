import {ThunkConfig} from "@/app/providers/Store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {PasswordRecoveryActions} from "@/features/PasswordRecovery";
import {AxiosError} from "axios";

export interface checkVerificationCodeServiceInputData {
    value: string;
}

const errorMessageMapper = (e: AxiosError) => {
    const errorMessage = e.response.data as string
    if (errorMessage) {
        if (errorMessage.includes('not found')) {
            return 'Код восстановления не найден'
        } else if (errorMessage.includes('expired')) {
            return 'Код восстановления недействителен'
        }
    } else {
        return e.message || 'Unknown error'
    }
}

export const checkVerificationCodeService = createAsyncThunk<
    void,
    checkVerificationCodeServiceInputData,
    ThunkConfig<string>
>('/auth/validate-verification-code', async (sendData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/auth/validate-verification-code', sendData);

        if (response.status !== 200) {
            console.log(response);
            throw new Error('Ошибка отправки кода');
        }

        dispatch(PasswordRecoveryActions.setStep(3));
        return response.data;
    } catch (e) {
        return rejectWithValue(errorMessageMapper(e));
    }
});
