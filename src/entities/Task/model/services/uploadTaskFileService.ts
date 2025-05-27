import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/Store';
import {File as FileI} from "@/features/File";

export interface UploadTaskFileInputData {
    file: File;
    projectId: number;
}

export const UploadTaskFileService = createAsyncThunk<
    FileI,
    UploadTaskFileInputData,
    ThunkConfig<string>
>('tasks/upload-file', async ({ file, projectId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await extra.api.post<FileI>(`/projects/${projectId}/tasks/files`, formData, {
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
