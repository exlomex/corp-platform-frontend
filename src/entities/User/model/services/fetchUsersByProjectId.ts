import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {UserI} from "../types/userSliceSchema.ts";
import {UserSliceActions} from "@/entities/User";


export interface FetchUsersByProjectIdInputData {
    ProjectId: number
}
export const FetchUsersByProjectIdService = createAsyncThunk<
    UserI[],
    FetchUsersByProjectIdInputData,
    ThunkConfig<string>
>('user/fetchUsersByProjectId', async (fetchData: FetchUsersByProjectIdInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.get<UserI[]>(`/access/${fetchData.ProjectId}`);
        const data: UserI[] | undefined = response.data;

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        dispatch(UserSliceActions.setProjectUsers(data))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
