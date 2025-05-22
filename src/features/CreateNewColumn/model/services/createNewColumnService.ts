import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface createNewColumnServiceInputData {
    createData: {
        boardId: number
        title: string
    },
    projectId: number

}

export const createNewColumnService = createAsyncThunk<
    void,
    createNewColumnServiceInputData,
    ThunkConfig<string>
>('column/createNewColumn', async (createData: createNewColumnServiceInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post(`/projects/${createData.projectId}/columns`, createData.createData);

        if (response.status !== 201) {
            throw new Error(response.statusText);
        }

    } catch (e) {
        return rejectWithValue(e.message || e)
    }
});

