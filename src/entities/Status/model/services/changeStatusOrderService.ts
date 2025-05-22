import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface ChangeStatusOrderInputData {
    statusId: number,
    toOrder: number,
    projectId: number
}
export const ChangeStatusOrderService = createAsyncThunk<
    void,
    ChangeStatusOrderInputData,
    ThunkConfig<string>
>('statuses/change-status-order', async ({statusId, toOrder, projectId}: ChangeStatusOrderInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch(`/projects/${projectId}/columns/${statusId}`, {toOrder: toOrder});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
