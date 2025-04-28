import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface createNewBoardServiceInputData {
    title: string
    projectId: number;
}

export const createNewBoardService = createAsyncThunk<
    void,
    createNewBoardServiceInputData,
    ThunkConfig<string>
>('board/createNewBoard', async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/boards', createData);

        if (response.status !== 201) {
            throw new Error(response.statusText);
        }

    } catch (e) {
        return rejectWithValue(e.message || e)
    }
});

