import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface EditProjectTitleInputData {
    newName: string;
    projectId: number;
}
export const EditProjectTitle = createAsyncThunk<
    void,
    EditProjectTitleInputData,
    ThunkConfig<string>
>('project/change-title', async ({newName, projectId}: EditProjectTitleInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch(`/projects/${projectId}`, {newName});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
