import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {MessageI} from "@/features/Message/model/types/messageSliceSchema.ts";
import {MessageActions} from "@/features/Message/model/slice/messageSlice.ts";

export const FetchSentMessagesService = createAsyncThunk<
    MessageI[],
    void,
    ThunkConfig<string>
>('messages/fetchSent', async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<MessageI[]>(`/messages/sent`);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        dispatch(MessageActions.setSentMessages(response.data))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
