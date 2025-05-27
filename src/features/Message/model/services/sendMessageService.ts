import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/Store';
import {File} from "@/features/File";

export interface SendMessageServiceInputData {
    title: string,
    text: string,
    fromId: number,
    toId: number,
    files?: string[] | []
}

export const SendMessageService = createAsyncThunk<
    void,
    SendMessageServiceInputData,
    ThunkConfig<string>
>('messages/upload-file', async (messageBody, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/messages', messageBody);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'Ошибка загрузки изображения');
    }
});
