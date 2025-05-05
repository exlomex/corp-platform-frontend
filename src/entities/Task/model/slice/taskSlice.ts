import {TaskI, TaskSliceSchema} from "../types/taskSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TaskSliceSchema = {
    boardTasks: []
}

export const TaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setBoardTasks: (state: TaskSliceSchema, action: PayloadAction<TaskI[]>) => {
            state.boardTasks = action.payload;
        },
        changeTaskStatus: (state: TaskSliceSchema, action: PayloadAction<{taskId: number, newStatusId: number}> ) => {
            const {taskId, newStatusId} = action.payload

            if (state.boardTasks.length) {
                const boardTasksArrayWithoutActiveTask = state.boardTasks.filter(task => task.id !== taskId)
                const task = JSON.parse(JSON.stringify(state.boardTasks.find(task => task.id === taskId)));
                task.statusId = newStatusId;

                state.boardTasks = [...boardTasksArrayWithoutActiveTask, task]
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(DeleteUserProjectById.pending, (state: ProjectSliceSchema) => {
    //             state.isDeleteProjectFetching = true;
    //         })
    //         .addCase(DeleteUserProjectById.rejected, (state: ProjectSliceSchema) => {
    //             state.isDeleteProjectFetching = false;
    //         })
    //         .addCase(DeleteUserProjectById.fulfilled, (state: ProjectSliceSchema) => {
    //             state.isDeleteProjectFetching = false;
    //         })
    // }
})

export const {actions: TaskActions} = TaskSlice;
export const {reducer: TaskReducer} = TaskSlice;