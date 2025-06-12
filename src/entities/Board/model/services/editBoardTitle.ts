import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";

export interface EditBoardTitleCInputData {
    newName: string;
    projectId: number;
    boardId: number
}
export const EditBoardTitle = createAsyncThunk<
    void,
    EditBoardTitleCInputData,
    ThunkConfig<string>
>('board/change-title', async ({newName, projectId, boardId}: EditBoardTitleCInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch(`/projects/${projectId}/boards/${boardId}`, {newName: newName});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
