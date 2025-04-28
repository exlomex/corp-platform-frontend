import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchUserProjects} from "@/entities/Project/model/services/fetchUserProjects.ts";

interface DeleteUserProjectInputData {
    id: number;
}

export const DeleteUserProjectById = createAsyncThunk<
    void,
    DeleteUserProjectInputData,
    ThunkConfig<string>
>('projects/delete', async (deleteData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.delete(`/projects/${deleteData.id}`);

        if (response.status !== 204) {
            throw new Error(response.statusText);
        }

        dispatch(FetchUserProjects())
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
