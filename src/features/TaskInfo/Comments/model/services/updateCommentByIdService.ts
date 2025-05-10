import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentActions, CommentI} from "@/features/TaskInfo";
import {ThunkConfig} from "@/app/providers/Store";

export interface UpdateCommentByIdInputData {
    id: number,
    text: string
}
export const UpdateCommentByIdService = createAsyncThunk<
    void,
    UpdateCommentByIdInputData,
    ThunkConfig<string>
>('comments/update', async (updateData: UpdateCommentByIdInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch(`/comments`, updateData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
