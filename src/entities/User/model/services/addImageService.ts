import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/Store';

export interface AddImageServiceInputData {
    file: File;
}

export const addImageService = createAsyncThunk<
    void,
    AddImageServiceInputData,
    ThunkConfig<string>
>('user/add-image', async ({ file }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await extra.api.post('/users/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'Ошибка загрузки изображения');
    }
});
