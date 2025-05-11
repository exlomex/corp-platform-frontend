import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/Store';

export interface editPersonalDataServiceInputData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const editPersonalDataService = createAsyncThunk<
    void,
    editPersonalDataServiceInputData,
    ThunkConfig<string>
>('user/edit-personal-data', async (editData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.put('/users', editData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'Изменения данных');
    }
});
