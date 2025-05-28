import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {TaskI} from "@/entities/Task";

export interface ChangeTaskDeadlineInputData {
    taskId: number;
    projectId: number;
    deadline: string | null

}
export const ChangeTaskDeadlineService = createAsyncThunk<
    TaskI,
    ChangeTaskDeadlineInputData,
    ThunkConfig<string>
>('tasks/change-deadline', async ({deadline, taskId, projectId}: ChangeTaskDeadlineInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<TaskI>(`/projects/${projectId}/tasks/${taskId}/deadline`, {deadline: deadline});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
