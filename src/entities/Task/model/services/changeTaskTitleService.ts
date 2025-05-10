import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface ChangeTaskTitleServiceInputData {
    id: number;
    title: string;
    description: string | null
}
export const ChangeTaskTitleService = createAsyncThunk<
    void,
    ChangeTaskTitleServiceInputData,
    ThunkConfig<string>
>('tasks/change-title', async (changeData: ChangeTaskTitleServiceInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.put(`/tasks`, changeData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
