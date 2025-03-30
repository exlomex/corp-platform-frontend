import {createAsyncThunk} from "@reduxjs/toolkit";
import {CheckInvitationCodeReturnedData, CheckInvitationCodeInputData} from "../types/CheckInvitationCodeTypes.ts";
import {ThunkConfig} from "@/app/providers/Store";
import {RegistrationSliceActions} from "@/features/Registration";

export const checkInvitationCode = createAsyncThunk<
    CheckInvitationCodeReturnedData, CheckInvitationCodeInputData , ThunkConfig<string>
>('user/CheckInvitationCode', async (data: CheckInvitationCodeInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<CheckInvitationCodeReturnedData>(`/invitations/${data.code}`);

        if (!response.data) {
            throw new Error();
        }

        dispatch(RegistrationSliceActions.setInvitationCodeIsActivate(true))
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
