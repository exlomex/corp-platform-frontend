import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {ProjectDataInterface} from "@/entities/Project";

export interface createNewProjectServiceInputData {
    title: string
    shortName: string;
}

export const createNewProjectService = createAsyncThunk<
    ProjectDataInterface,
    createNewProjectServiceInputData,
    ThunkConfig<string>
>('company/createNewProject', async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<ProjectDataInterface>('/projects', createData);
        const data: ProjectDataInterface = response.data
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return data
    } catch (e) {
        return rejectWithValue(e.message || e)
    }
});

