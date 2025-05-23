import {createAsyncThunk} from "@reduxjs/toolkit";
import {TaskActions} from "../slice/taskSlice.ts";
import {TreeTask} from "../types/taskSliceSchema.ts";
import {ThunkConfig} from "@/app/providers/Store";
import {Priority, PriorityKeys, ResolutionKeys} from "@/entities/Task";

export interface TasksTreeFilters {
    boardIds?: (string | number)[],
    authorIds?: (string | number)[],
    assigneeIds?: (string | number)[] | null
    priorities?: PriorityKeys[],
    text?: string,
    resolutions?: ResolutionKeys[]
    deadlineStart?: string, // "2025-05-15"
    deadlineEnd?: string
    storyPointsFrom?: number,
    storyPointsTo?: number
}

export interface FetchProjectTreeTasksInputData {
    projectId: number,
    filters?: TasksTreeFilters
}
export const FetchProjectTreeTasksService = createAsyncThunk<
    TreeTask[],
    FetchProjectTreeTasksInputData,
    ThunkConfig<string>
>('treeTasks/fetch', async (fetchData: FetchProjectTreeTasksInputData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.post<TreeTask[]>(`/projects/${fetchData.projectId}/tasks/tree`, fetchData.filters || {});
        const data: TreeTask[] | undefined = response.data;

        if (!data) {
            throw new Error(response.statusText);
        }

        await dispatch(TaskActions.setTreeTasks(data))
        await dispatch(TaskActions.setProjectsTreeTasksIsFirstLoading(false))
        return response.data;
    } catch (e) {
        return rejectWithValue(e.message || 'error');
    }
});
