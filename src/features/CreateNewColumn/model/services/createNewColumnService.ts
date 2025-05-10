import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface createNewColumnServiceInputData {
    boardId: number
    title: string
}

export const createNewColumnService = createAsyncThunk<
    void,
    createNewColumnServiceInputData,
    ThunkConfig<string>
>('column/createNewColumn', async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/columns', createData);

        if (response.status !== 201) {
            throw new Error(response.statusText);
        }

    } catch (e) {
        return rejectWithValue(e.message || e)
    }
});

