import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface RemoveSubTaskInputData {
    removeData: {
        parentTaskId: number,
        subtaskId: number,
    },
    projectId: number;
}
export const RemoveSubTaskService = createAsyncThunk<
    void,
    RemoveSubTaskInputData,
    ThunkConfig<string>
>('tasks/remove-subtask', async (removeSubTaskBody: RemoveSubTaskInputData , thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await extra.api.delete(`/projects/${removeSubTaskBody.projectId}/tasks/subtasks`, {
            data: removeSubTaskBody.removeData,
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
