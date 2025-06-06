import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {Priority} from "@/entities/Task";

export interface createNewTaskServiceInputData {
    title: string,
    description?: string,
    projectId: number,
    boardId: number,
    statusId?: number,
    assignedTo?: number
    priority?: keyof typeof Priority;
    storyPoints?: number;
    deadline?: string
    files?: string[]
}

export const createNewTaskService = createAsyncThunk<
    void,
    createNewTaskServiceInputData,
    ThunkConfig<string>
>('tasks/createNewTaskService', async (createData: createNewTaskServiceInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post(`/projects/${createData.projectId}/tasks`, createData);

        if (response.status !== 201) {
            throw new Error(response.statusText);
        }

    } catch (e) {
        return rejectWithValue(e.message || e)
    }
});

