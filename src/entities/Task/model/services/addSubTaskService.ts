import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface AddSubTaskInputData {
    createData: {
        parentTaskId: number,
        subtaskId: number,
    }
    projectId: number
}
export const AddSubTaskService = createAsyncThunk<
    void,
    AddSubTaskInputData,
    ThunkConfig<string>
>('tasks/add-subtask', async (addSubTaskBody: AddSubTaskInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post(`/projects/${addSubTaskBody.projectId}/tasks/subtasks`, addSubTaskBody.createData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'error');
    }
});
