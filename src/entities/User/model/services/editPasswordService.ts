import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/Store';

export interface editPasswordServiceInputData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const editPasswordService = createAsyncThunk<
    void,
    editPasswordServiceInputData,
    ThunkConfig<string>
>('user/edit-password', async (editData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.put('/users', editData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'Ошибка изменения пароля');
    }
});
