import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/Store';
import {File as FileI} from "@/features/File";

export interface AddTaskFileServiceInputData {
    addData: {
        url: string
    };
    projectId: number;
    taskId: number;
}

export const AddTaskFileService = createAsyncThunk<
    void,
    AddTaskFileServiceInputData,
    ThunkConfig<string>
>('tasks/add-file', async ({ addData, taskId, projectId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch(`/projects/${projectId}/tasks/${taskId}/files`, addData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'Ошибка загрузки изображения');
    }
});
