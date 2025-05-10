import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserRoles, UserSliceActions} from "@/entities/User";
import {ThunkConfig} from "@/app/providers/Store";

export interface FetchUserInfoReturnedData {
    id: number;
    firstName: string;
    lastName: string;
    role: UserRoles;
    companyId?: number
}
export const fetchUserInfo = createAsyncThunk<
    FetchUserInfoReturnedData,
    void,
    ThunkConfig<string>
>('user/fetchUserInfo', async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<FetchUserInfoReturnedData>('/users');

        if (!response.data) {
            throw new Error();
        }

        if (response.data.companyId) {
            dispatch(UserSliceActions.setCompanyId(response.data.companyId))
        }

        dispatch(UserSliceActions.setUserInfo(response.data))
        dispatch(UserSliceActions.setUserIsFetched(true))
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
