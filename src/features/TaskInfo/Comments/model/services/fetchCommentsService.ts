import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentActions, CommentI} from "@/features/TaskInfo";
import {ThunkConfig} from "@/app/providers/Store";

export interface FetchCommentsInputData {
    taskId: number
}
export const FetchCommentsService = createAsyncThunk<
    CommentI[],
    FetchCommentsInputData,
    ThunkConfig<string>
>('comments/fetch', async (fetchData: FetchCommentsInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<CommentI[]>(`/comments/task/${fetchData.taskId}`);
        const data: CommentI[] | undefined = response.data;

        if (!data) {
            throw new Error(response.statusText);
        }

        dispatch(CommentActions.setTaskComments(data))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
