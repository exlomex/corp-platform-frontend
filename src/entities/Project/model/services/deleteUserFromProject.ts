import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface DeleteUserFromProjectInputData {
    userId: number;
    projectId: number
}
export const DeleteUserFromProject = createAsyncThunk<
    void,
    DeleteUserFromProjectInputData,
    ThunkConfig<string>
>('access/delete', async (deleteBody: DeleteUserFromProjectInputData , thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await extra.api.delete(`/access`, {
            data: deleteBody,
            headers: headers,
        });

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e?.response?.data || e.message || 'error');
    }
});
