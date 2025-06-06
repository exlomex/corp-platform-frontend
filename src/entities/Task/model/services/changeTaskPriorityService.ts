import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {Priority, TaskI} from "@/entities/Task";

export interface ChangeTaskPriorityInputData {
    taskId: number
    priority: keyof typeof Priority
    projectId: number
}
export const ChangeTaskPriorityService = createAsyncThunk<
    TaskI,
    ChangeTaskPriorityInputData,
    ThunkConfig<string>
>('tasks/change-priority', async ({priority, taskId, projectId}: ChangeTaskPriorityInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<TaskI>(`/projects/${projectId}/tasks/${taskId}/priority`, {priority: priority});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
