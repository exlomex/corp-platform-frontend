import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {UserSliceActions} from "@/entities/User";

export interface createNewCompanyServiceInputData {
    title: string
}

export const createNewCompanyService = createAsyncThunk<
    void,
    createNewCompanyServiceInputData,
    ThunkConfig<string>
>('company/createNewCompany', async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/companies', createData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        dispatch(UserSliceActions.setAuth(response.data));
    } catch (e) {
        return rejectWithValue(e.message || e)
    }
});
