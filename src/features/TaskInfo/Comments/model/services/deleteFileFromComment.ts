import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface DeleteFileFromCommentInputData {
    fileId: number,
    commentId: number
}
export const DeleteFileFromComment = createAsyncThunk<
    void,
    DeleteFileFromCommentInputData,
    ThunkConfig<string>
>('comments/delete-file', async ({commentId, fileId}, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.delete(`/comments/${commentId}/files/${fileId}`);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'error');
    }
});
