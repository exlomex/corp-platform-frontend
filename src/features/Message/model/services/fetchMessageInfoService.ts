import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {MessageI} from "@/features/Message/model/types/messageSliceSchema.ts";
import {MessageActions} from "@/features/Message/model/slice/messageSlice.ts";

interface FetchMessageInfoInputData {
    messageId: string;
}

export const FetchMessageInfoService = createAsyncThunk<
    MessageI,
    FetchMessageInfoInputData,
    ThunkConfig<string>
>('messages/fetchMessageInfo', async (FetchMessageInfoInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<MessageI>(`/messages/${FetchMessageInfoInputData.messageId}`);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        dispatch(MessageActions.setMessageInfo(response.data))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
