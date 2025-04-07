import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface inviteToCompanyServiceInputData {
    email: string
}

export const inviteToCompanyService = createAsyncThunk<
    void,
    inviteToCompanyServiceInputData,
    ThunkConfig<string>
>('company/inviteToCompany', async (inviteData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/invitations', inviteData);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

    } catch (e) {
        return rejectWithValue(e.message || e)
    }
});
