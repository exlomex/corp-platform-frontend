import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {Priority} from "@/features/CreateNewTask/const/priorityConsts.tsx";
import {TaskI} from "@/entities/Task";

export interface ChangeTaskPriorityInputData {
    taskId: number
    priority: keyof typeof Priority
}
export const ChangeTaskPriorityService = createAsyncThunk<
    TaskI,
    ChangeTaskPriorityInputData,
    ThunkConfig<string>
>('tasks/change-priority', async ({priority, taskId}: ChangeTaskPriorityInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<TaskI>(`/tasks/${taskId}/priority`, {priority: priority});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
