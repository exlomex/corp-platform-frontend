import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProjectDataInterface} from "@/entities/Project/model/types/projectSliceSchema.ts";
import {ProjectActions} from "@/entities/Project";
import {UserI} from "@/entities/User";

interface FetchUsersInProjectInputValue {
    projectId: number;
}

export const FetchUsersInProject = createAsyncThunk<
    UserI[],
    FetchUsersInProjectInputValue,
    ThunkConfig<string>
>('access/fetchProjectUsers', async (fetchBody: FetchUsersInProjectInputValue, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<UserI[]>(`/access/${fetchBody.projectId}`);
        const data: UserI[] = response.data;

        if (!data) {
            throw new Error(response.statusText);
        }

        dispatch(ProjectActions.setSettingProjectUsers(data))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
