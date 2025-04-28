import {BoardInterface, BoardSliceSchema} from "../types/boardSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FetchUserBoardsByProjectId} from "../services/fetchUserBoardsByProjectId.ts";


const initialState: BoardSliceSchema = {
    userBoardsBySelectedProject: [],

    isUserBoardsFetching: false,
    isUserBoardsFirstLoading: true
}

export const BoardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setIsUserBoardsFirstLoading: (state: BoardSliceSchema, action: PayloadAction<boolean>) => {
            state.isUserBoardsFirstLoading = action.payload;
        },
        setUserBoards: (state: BoardSliceSchema, action: PayloadAction<BoardInterface[]>) => {
            state.userBoardsBySelectedProject = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchUserBoardsByProjectId.pending, (state: BoardSliceSchema) => {
                state.isUserBoardsFetching = true;
            })
            .addCase(FetchUserBoardsByProjectId.rejected, (state: BoardSliceSchema) => {
                state.isUserBoardsFetching = false;
            })
            .addCase(FetchUserBoardsByProjectId.fulfilled, (state: BoardSliceSchema) => {
                state.isUserBoardsFetching = false;
            })
    }
})

export const {actions: BoardActions} = BoardSlice;
export const {reducer: BoardReducer} = BoardSlice;