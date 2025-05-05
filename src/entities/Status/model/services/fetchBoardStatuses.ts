import {createAsyncThunk} from "@reduxjs/toolkit";
import {StatusI} from "../types/statusSliceSchema.ts";
import {ThunkConfig} from "@/app/providers/Store";
import {StatusActions} from "../slice/statusSlice.ts";

export interface FetchBoardStatusesInputData {
    boardId: number
}
export const FetchBoardStatuses = createAsyncThunk<
    StatusI[],
    FetchBoardStatusesInputData,
    ThunkConfig<string>
>('statuses/fetch', async (fetchData: FetchBoardStatusesInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<StatusI[]>(`/statuses?boardId=${fetchData.boardId}`);
        const data: StatusI[] | undefined = response.data;

        if (!data) {
            throw new Error(response.statusText);
        }

        dispatch(StatusActions.setBoardStatuses(data))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
