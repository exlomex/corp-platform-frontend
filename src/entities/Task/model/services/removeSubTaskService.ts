import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface RemoveSubTaskInputData {
    parentTaskId: number,
    subtaskId: number,
}
export const RemoveSubTaskService = createAsyncThunk<
    void,
    RemoveSubTaskInputData,
    ThunkConfig<string>
>('tasks/remove-subtask', async (removeSubTaskBody: RemoveSubTaskInputData , thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    const headers = {
        'Content-Type': 'text/plain',
    };

    try {
        const response = await extra.api.delete(`/tasks/subtasks`, {
            data: removeSubTaskBody,
            headers: headers,
        });

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'error');
    }
});
