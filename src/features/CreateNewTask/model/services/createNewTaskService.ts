import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface createNewTaskServiceInputData {
    title: string,
    description?: string,
    projectId: number,
    boardId: number,
    statusId?: number,
    assignedTo?: number
}

export const createNewTaskService = createAsyncThunk<
    void,
    createNewTaskServiceInputData,
    ThunkConfig<string>
>('tasks/createNewTaskService', async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/tasks', createData);

        if (response.status !== 201) {
            throw new Error(response.statusText);
        }

    } catch (e) {
        return rejectWithValue(e.message || e)
    }
});

