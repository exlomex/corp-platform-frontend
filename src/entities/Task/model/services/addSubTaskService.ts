import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface AddSubTaskInputData {
    parentTaskId: number,
    subtaskId: number,
}
export const AddSubTaskService = createAsyncThunk<
    void,
    AddSubTaskInputData,
    ThunkConfig<string>
>('tasks/add-subtask', async (addSubTaskBody, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post(`/tasks/subtasks`, addSubTaskBody);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'error');
    }
});
