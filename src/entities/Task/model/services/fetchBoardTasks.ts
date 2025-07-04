import {createAsyncThunk} from "@reduxjs/toolkit";
import {TaskActions} from "../slice/taskSlice.ts";
import {TaskI} from "../types/taskSliceSchema.ts";
import {ThunkConfig} from "@/app/providers/Store";


export interface FetchBoardTasksInputData {
    boardId: number
    projectId: number
}
export const FetchBoardTasks = createAsyncThunk<
    TaskI[],
    FetchBoardTasksInputData,
    ThunkConfig<string>
>('tasks/fetch', async (fetchData: FetchBoardTasksInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<TaskI[]>(`/projects/${fetchData.projectId}/tasks/board/${fetchData.boardId}`);
        const data: TaskI[] | undefined = response.data;

        if (!data) {
            throw new Error(response.statusText);
        }

        dispatch(TaskActions.setBoardTasks(data))
        dispatch(TaskActions.setBoardTasksIsFirstLoading(false))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
