import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProjectDataInterface} from "@/entities/Project/model/types/projectSliceSchema.ts";
import {FetchUsersInProject, ProjectActions} from "@/entities/Project";
import {UserI} from "@/entities/User";

interface AddUserInProjectInputValue {
    projectId: number;
    userId: number
}

export const AddUserInProject = createAsyncThunk<
    void,
    AddUserInProjectInputValue,
    ThunkConfig<string>
>('access/addUser', async (addBody: AddUserInProjectInputValue, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post(`/access`, addBody);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        dispatch(FetchUsersInProject({projectId: addBody.projectId}))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
