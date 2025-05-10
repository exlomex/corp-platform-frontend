import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {UserI} from "../types/userSliceSchema.ts";
import {UserSliceActions} from "@/entities/User";


export interface FetchUsersByCompanyIdInputData {
    companyId: number
}
export const FetchUsersByCompanyIdService = createAsyncThunk<
    UserI[],
    FetchUsersByCompanyIdInputData,
    ThunkConfig<string>
>('user/fetchUsersById', async (fetchData: FetchUsersByCompanyIdInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.get<UserI[]>(`/users/${fetchData.companyId}`);
        const data: UserI[] | undefined = response.data;

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        dispatch(UserSliceActions.setCompanyUsers(data))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
