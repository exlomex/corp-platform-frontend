import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {BoardActions, BoardInterface} from "@/entities/Board";

export interface FetchUserBoardsByProjectIdInputData {
    projectId: number
}

export const FetchUserBoardsByProjectId = createAsyncThunk<
    BoardInterface[],
    FetchUserBoardsByProjectIdInputData,
    ThunkConfig<string>
>('boards/fetch', async (boardData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        dispatch(BoardActions.setIsUserBoardsFirstLoading(false))

        const response = await extra.api.get(`/boards?projectId=${boardData.projectId}`);
        const data: BoardInterface[] | undefined = response.data;

        if (!data) {
            throw new Error(response.statusText);
        }

        dispatch(BoardActions.setUserBoards(data))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
