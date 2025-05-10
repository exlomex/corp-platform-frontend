import {createAsyncThunk} from "@reduxjs/toolkit";
import {TaskActions} from "../slice/taskSlice.ts";
import {TaskI} from "../types/taskSliceSchema.ts";
import {ThunkConfig} from "@/app/providers/Store";


export interface fetchTaskInfoServiceInputData {
    uniqueTitle: string
}
export const fetchTaskInfoService = createAsyncThunk<
    TaskI,
    fetchTaskInfoServiceInputData,
    ThunkConfig<string>
>('tasks/fetch', async (fetchData: fetchTaskInfoServiceInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<TaskI>(`/tasks/title/${fetchData.uniqueTitle}`);
        const data: TaskI | undefined = response.data;

        if (!data) {
            throw new Error(response.statusText);
        }

        dispatch(TaskActions.setSelectedTaskInfo(data))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
