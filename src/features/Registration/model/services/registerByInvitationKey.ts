import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserSliceActions} from "@/entities/User";
import {
    registerByInvitationKeyInputData,
    registerByInvitationKeyReturnedData
} from "../types/registerByInvitationKeyTypes.ts";

export const RegisterByInvitationKey = createAsyncThunk<
    registerByInvitationKeyReturnedData,
    registerByInvitationKeyInputData,
    ThunkConfig<string>
>('user/registerByInvitationKey', async (registerData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<registerByInvitationKeyReturnedData>('/invitations/accept', registerData);

        if (!response.data) {
            throw new Error();
        }

        dispatch(UserSliceActions.setAuth(response.data));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
