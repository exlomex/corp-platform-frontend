import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface ChangeColumnTitleInputData {
    statusId: number;
    title: string
}
export const ChangeColumnTitleService = createAsyncThunk<
    void,
    ChangeColumnTitleInputData,
    ThunkConfig<string>
>('column/change-title', async ({title, statusId}: ChangeColumnTitleInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch(`/statuses/${statusId}`, {title});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
