import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface AddFileToCommentInputData {
    url: string,
    commentId: number
}
export const AddFileToCommentService = createAsyncThunk<
    void,
    AddFileToCommentInputData,
    ThunkConfig<string>
>('comments/add-file', async ({commentId, url}, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch(`/comments/${commentId}/files`, {url: url});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'error');
    }
});
