import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface DeleteUserServiceInputData {
    userId: number,
}
export const DeleteUserService = createAsyncThunk<
    void,
    DeleteUserServiceInputData,
    ThunkConfig<string>
>('tasks/remove-subtask', async (deleteData: DeleteUserServiceInputData , thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.delete(`/users/${deleteData.userId}`);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'error');
    }
});
