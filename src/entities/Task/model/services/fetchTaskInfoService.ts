import {createAsyncThunk} from "@reduxjs/toolkit";
import {TaskActions} from "../slice/taskSlice.ts";
import {TaskI} from "../types/taskSliceSchema.ts";
import {ThunkConfig} from "@/app/providers/Store";


export interface fetchTaskInfoServiceInputData {
    uniqueTitle: string
    projectId: number
    dispatchData?: boolean
}
export const fetchTaskInfoService = createAsyncThunk<
    TaskI,
    fetchTaskInfoServiceInputData,
    ThunkConfig<string>
>('tasks/fetch', async ({projectId, uniqueTitle, dispatchData = true}: fetchTaskInfoServiceInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<TaskI>(`/projects/${projectId}/tasks/title/${uniqueTitle}`);
        const data = response.data;

        if (!data) {
            throw new Error(response.statusText);
        }

        if (dispatchData) dispatch(TaskActions.setSelectedTaskInfo(data));
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
