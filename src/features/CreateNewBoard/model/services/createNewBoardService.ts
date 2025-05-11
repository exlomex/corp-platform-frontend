import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {BoardInterface} from "@/entities/Board";

export interface createNewBoardServiceInputData {
    title: string
    projectId: number;
}

export const createNewBoardService = createAsyncThunk<
    BoardInterface,
    createNewBoardServiceInputData,
    ThunkConfig<string>
>('board/createNewBoard', async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<BoardInterface>('/boards', createData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data
    } catch (e) {
        return rejectWithValue(e.message || e)
    }
});

