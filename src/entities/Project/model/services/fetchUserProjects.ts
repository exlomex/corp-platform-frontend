import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProjectDataInterface} from "@/entities/Project/model/types/projectSliceSchema.ts";
import {ProjectActions} from "@/entities/Project";

export const FetchUserProjects = createAsyncThunk<
    ProjectDataInterface[],
    void,
    ThunkConfig<string>
>('projects/fetch', async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        dispatch(ProjectActions.setIsFirstFetchUserProject(false))

        const response = await extra.api.get<ProjectDataInterface[]>('/projects');
        const data: ProjectDataInterface[] | undefined = response.data;

        if (!data) {
            throw new Error(response.statusText);
        }

        dispatch(ProjectActions.setUserProjects(data))
        dispatch(ProjectActions.initProjects())
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
