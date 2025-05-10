import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {BoardActions, BoardInterface} from "@/entities/Board";

export interface FetchUserBoardsByProjectIdInputData {
    projectId: number,
    fetchType?: 'create' | 'regular'
}

export const FetchUserBoardsByProjectId = createAsyncThunk<
    BoardInterface[],
    FetchUserBoardsByProjectIdInputData,
    ThunkConfig<string>
>('boards/fetch', async ({projectId, fetchType = 'regular'}, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        dispatch(BoardActions.setIsUserBoardsFirstLoading(false))

        const response = await extra.api.get(`/boards?projectId=${projectId}`);
        const data: BoardInterface[] | undefined = response.data;

        if (!data) {
            throw new Error(response.statusText);
        }

        if (fetchType === 'regular') {
            dispatch(BoardActions.setUserBoards(data))
        }
        if (fetchType === 'create') {
            dispatch(BoardActions.setCreateUserBoards(data))
        }
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
