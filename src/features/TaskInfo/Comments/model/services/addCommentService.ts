import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface addCommentInputData {
    text: string,
    taskId: number
}
export const addCommentService = createAsyncThunk<
    void,
    addCommentInputData,
    ThunkConfig<string>
>('comments/add-comment', async (addData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post(`/comments`, addData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'error');
    }
});
