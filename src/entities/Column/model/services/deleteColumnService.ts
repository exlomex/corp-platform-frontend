import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchUserProjects} from "@/entities/Project/model/services/fetchUserProjects.ts";

export interface deleteColumnServiceInputData {
    statusId: number;
}

export const deleteColumnService = createAsyncThunk<
    void,
    deleteColumnServiceInputData,
    ThunkConfig<string>
>('columns/delete', async (deleteData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.delete(`/columns/${deleteData.statusId}`);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
