import {createAsyncThunk} from "@reduxjs/toolkit";
import {TaskSnapshots} from "@/entities/Task/model/types/taskSliceSchema.ts";
import {ThunkConfig} from "@/app/providers/Store";
import {TaskActions} from "@/entities/Task";


export interface FetchTaskSnapshotsInputData {
    taskId: number
}

export const FetchTaskSnapshots = createAsyncThunk<
    TaskSnapshots[],
    FetchTaskSnapshotsInputData,
    ThunkConfig<string>
>('tasks/fetch-snapshots', async (fetchData: FetchTaskSnapshotsInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<TaskSnapshots[]>(`/tasks/snapshots/${fetchData.taskId}`);
        const data: TaskSnapshots[] = response.data;
        data.sort((a, b) => b.version - a.version);

        if (!data) {
            throw new Error(response.statusText);
        }

        dispatch(TaskActions.setSelectedTaskSnapshots(data))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
