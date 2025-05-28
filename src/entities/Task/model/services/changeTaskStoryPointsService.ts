import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/Store";
import {TaskI} from "@/entities/Task";

export interface ChangeTaskStoryPointsInputData {
    taskId: number;
    projectId: number;
    storyPoints: number

}
export const ChangeTaskStoryPointsService = createAsyncThunk<
    TaskI,
    ChangeTaskStoryPointsInputData,
    ThunkConfig<string>
>('tasks/change-story-points', async ({storyPoints, taskId, projectId}: ChangeTaskStoryPointsInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<TaskI>(`/projects/${projectId}/tasks/${taskId}/story-points`, {storyPoints: storyPoints});

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
