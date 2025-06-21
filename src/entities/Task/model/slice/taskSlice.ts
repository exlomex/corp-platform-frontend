import {
    TaskI,
    TaskNavigationHistory,
    TaskSliceSchema,
    TaskSnapshots,
    TreeTask
} from "../types/taskSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddSubTaskService} from "../services/addSubTaskService.ts";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";
import {FetchProjectTreeTasksService} from "../services/fetchProjectTreeTasksService.ts";
import {FetchBoardTasks} from "../services/fetchBoardTasks.ts";
import {FetchTaskSnapshots} from "../services/fetchTaskSnapshots.ts";


const initialState: TaskSliceSchema = {
    boardTasks: [],
    addSubTaskModalIsOpen: false,
    addTaskModalIsActive: false,
    taskInfoModalIsOpen: false,
    selectedTaskInfoIsFetching: false,
    taskNavigationHistory: [],
    projectTreeTasks: [],
    projectsTreeTasksIsFetching: false,
    projectsTreeTasksIsFirstLoading: true,
    boardTasksIsFirstLoading: true,
    boardTasksIsFetching: false,
    selectedTaskSnapshotsIsFetching: false,
}

export const TaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        resetTasks: () => initialState,
        setSelectedTaskSnapshots: (state: TaskSliceSchema, action: PayloadAction<TaskSnapshots[]>) => {
            state.selectedTaskSnapshots = action.payload;
        },
        setProjectsTreeTasksIsFirstLoading: (state: TaskSliceSchema, action: PayloadAction<boolean>) => {
            state.projectsTreeTasksIsFirstLoading = action.payload;
        },
        setTreeTasks: (state: TaskSliceSchema, action: PayloadAction<TreeTask[]>) => {
            state.projectTreeTasks = action.payload;
        },
        setSubTaskError: (state: TaskSliceSchema, action: PayloadAction<string | undefined>) => {
            state.addSubTaskError = action.payload
        },
        pushToNavigationHistory: (state: TaskSliceSchema, action: PayloadAction<TaskNavigationHistory>) => {
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
        setBoardTasksIsFirstLoading: (state: TaskSliceSchema, action: PayloadAction<boolean>) => {
            state.boardTasksIsFirstLoading = action.payload;
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
            // FetchBoardTasks
            .addCase(FetchBoardTasks.pending, (state: TaskSliceSchema) => {
                state.boardTasksIsFetching = true;
            })
            .addCase(FetchBoardTasks.fulfilled, (state: TaskSliceSchema) => {
                state.boardTasksIsFetching = false;
            })
            .addCase(FetchBoardTasks.rejected, (state: TaskSliceSchema) => {
                state.boardTasksIsFetching = false;
            })
            // AddSubTaskService
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
            // FetchProjectTreeTasksService
            .addCase(FetchProjectTreeTasksService.pending, (state: TaskSliceSchema) => {
                state.projectsTreeTasksIsFetching = true
            })
            .addCase(FetchProjectTreeTasksService.fulfilled, (state: TaskSliceSchema) => {
                state.projectsTreeTasksIsFetching = false
            })
            .addCase(FetchProjectTreeTasksService.rejected, (state: TaskSliceSchema, action) => {
                state.projectsTreeTasksIsFetching = false;
            })
            // FetchTaskSnapshots
            .addCase(FetchTaskSnapshots.pending, (state: TaskSliceSchema) => {
                state.selectedTaskSnapshotsIsFetching = true
            })
            .addCase(FetchTaskSnapshots.fulfilled, (state: TaskSliceSchema) => {
                state.selectedTaskSnapshotsIsFetching = false
            })
            .addCase(FetchTaskSnapshots.rejected, (state: TaskSliceSchema, action) => {
                state.selectedTaskSnapshotsIsFetching = false;
            })
    }
})

export const {actions: TaskActions} = TaskSlice;
export const {reducer: TaskReducer} = TaskSlice;