import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface addTaskAssigneeInputData {
    taskId: number,
    assigneeId: number,
    projectId: number
}
export const AddTaskAssigneeService = createAsyncThunk<
    void,
    addTaskAssigneeInputData,
    ThunkConfig<string>
>('tasks/add-assignee', async ({assigneeId, taskId, projectId}: addTaskAssigneeInputData , thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch(`/projects/${projectId}/tasks/${taskId}`, {assigneeId});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'error');
    }
});
