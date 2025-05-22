import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface ChangeTaskTitleServiceInputData {
    changeData: {
        id: number;
        title: string;
        description: string | null
    }
    projectId: number
}
export const ChangeTaskTitleService = createAsyncThunk<
    void,
    ChangeTaskTitleServiceInputData,
    ThunkConfig<string>
>('tasks/change-title', async (data: ChangeTaskTitleServiceInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.put(`/projects/${data.projectId}/tasks`, data.changeData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
