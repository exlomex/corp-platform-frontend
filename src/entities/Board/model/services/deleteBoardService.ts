import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";

export interface DeleteBoardServiceInputData {
    projectId: number;
    boardId: number;
}

export const DeleteBoardService = createAsyncThunk<
    void,
    DeleteBoardServiceInputData,
    ThunkConfig<string>
>('board/delete', async (deleteData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.delete(`/projects/${deleteData.projectId}/boards/${deleteData.boardId}`);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
