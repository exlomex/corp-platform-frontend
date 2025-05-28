import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/Store';

export interface RemoveTaskFileInputData {
    projectId: number;
    taskId: number;
    fileId: number;
}

export const RemoveTaskFileService = createAsyncThunk<
    void,
    RemoveTaskFileInputData,
    ThunkConfig<string>
>('tasks/remove-file', async ({ taskId, projectId, fileId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.delete(`/projects/${projectId}/tasks/${taskId}/files/${fileId}`);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'Ошибка удаления изображения');
    }
});
