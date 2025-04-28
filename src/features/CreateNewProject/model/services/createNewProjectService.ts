import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface createNewProjectServiceInputData {
    title: string
    shortName: string;
}

export const createNewProjectService = createAsyncThunk<
    void,
    createNewProjectServiceInputData,
    ThunkConfig<string>
>('company/createNewProject', async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/projects', createData);

        if (response.status !== 201) {
            throw new Error(response.statusText);
        }

    } catch (e) {
        return rejectWithValue(e.message || e)
    }
});







createNewProjectService
