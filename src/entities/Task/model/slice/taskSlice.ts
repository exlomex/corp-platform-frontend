import {TaskI, TaskSliceSchema} from "../types/taskSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddSubTaskService} from "../services/addSubTaskService.ts";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";


const initialState: TaskSliceSchema = {
    boardTasks: [],
    addSubTaskModalIsOpen: false,
    addTaskModalIsActive: false,
    taskInfoModalIsOpen: false,
    selectedTaskInfoIsFetching: false,
    taskNavigationHistory: []
}

export const TaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setSubTaskError: (state: TaskSliceSchema, action: PayloadAction<string | undefined>) => {
            state.addSubTaskError = action.payload
        },
        pushToNavigationHistory: (state: TaskSliceSchema, action: PayloadAction<string>) => {
            state.taskNavigationHistory.push(action.payload);
        },
        popFromNavigationHistory: (state: TaskSliceSchema) => {
            state.taskNavigationHistory.pop();
        },
        resetNavigationHistory: (state: TaskSliceSchema) => {
            state.taskNavigationHistory = [];
        },
        setSelectedTaskUniqueTitle: (state: TaskSliceSchema, action: PayloadAction<string>) => {
            state.selectedTaskUniqueTitle = action.payload;
        },
        setSelectedTaskInfo: (state: TaskSliceSchema, action: PayloadAction<TaskI>) => {
            state.selectedTaskInfo = action.payload;
        },
        setTaskInfoModalIsOpen:  (state: TaskSliceSchema, action: PayloadAction<boolean>) => {
          state.taskInfoModalIsOpen = action.payload;
        },
        setIsOpenAddTaskModal: (state: TaskSliceSchema, action: PayloadAction<boolean>) => {
            state.addTaskModalIsActive = action.payload;
        },
        setBoardTasks: (state: TaskSliceSchema, action: PayloadAction<TaskI[]>) => {
            state.boardTasks = action.payload;
        },
        setIsOpenSubTaskModal: (state: TaskSliceSchema, action: PayloadAction<boolean>) => {
            state.addSubTaskModalIsOpen = action.payload;
        },
        setAddSubTaskSelectedTaskUniqueTitle: (state: TaskSliceSchema, action: PayloadAction<{id: number, uniqueTitle: string}>) => {
            state.addSubTaskSelectedTask = action.payload;
        },
        changeTaskStatus: (state: TaskSliceSchema, action: PayloadAction<{taskId: number, newStatusId: number}> ) => {
            const {taskId, newStatusId} = action.payload

            if (state.boardTasks.length) {
                const boardTasksArrayWithoutActiveTask = state.boardTasks.filter(task => task.id !== taskId)
                const task = JSON.parse(JSON.stringify(state.boardTasks.find(task => task.id === taskId)));
                task.statusId = newStatusId;

                state.boardTasks = [task, ...boardTasksArrayWithoutActiveTask, ]
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddSubTaskService.pending, (state: TaskSliceSchema) => {
                state.addSubTaskError = undefined
            })
            .addCase(AddSubTaskService.rejected, (state: TaskSliceSchema, action) => {
                state.addSubTaskError = action.payload;
            })
            // fetchTaskInfoService
            .addCase(fetchTaskInfoService.pending, (state: TaskSliceSchema) => {
                state.selectedTaskInfoIsFetching = true
            })
            .addCase(fetchTaskInfoService.fulfilled, (state: TaskSliceSchema) => {
                state.selectedTaskInfoIsFetching = false
            })
            .addCase(fetchTaskInfoService.rejected, (state: TaskSliceSchema, action) => {
                state.selectedTaskInfoIsFetching = false;
            })
    }
})

export const {actions: TaskActions} = TaskSlice;
export const {reducer: TaskReducer} = TaskSlice;