import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface ChangeTaskStatusInputData {
    taskId: number
    statusId: number
}
export const ChangeTaskStatusService = createAsyncThunk<
    void,
    ChangeTaskStatusInputData,
    ThunkConfig<string>
>('tasks/change-status', async ({statusId, taskId}: ChangeTaskStatusInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch(`/tasks/${taskId}/status`, {statusId: statusId});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
