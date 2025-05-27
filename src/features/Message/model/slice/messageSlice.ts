import {MessageI, MessageSliceSchema} from "@/features/Message/model/types/messageSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: MessageSliceSchema = {
    newMessageModalIsOpen: false,
}

export const MessageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessageInfo: (state, action: PayloadAction<MessageI>) => {
            state.messageInfo = action.payload;
        },
        setReceivedMessages: (state: MessageSliceSchema, action: PayloadAction<MessageI[]>) => {
            state.receivedMessages = action.payload;
        },
        setSentMessages: (state: MessageSliceSchema, action: PayloadAction<MessageI[]>) => {
            state.sentMessages = action.payload;
        },
        setNewMessageIsOpen: (state: MessageSliceSchema, action: PayloadAction<boolean>) => {
            state.newMessageModalIsOpen = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(FetchUserBoardsByProjectId.pending, (state: BoardSliceSchema) => {
    //             state.isUserBoardsFetching = true;
    //         })
    //         .addCase(FetchUserBoardsByProjectId.rejected, (state: BoardSliceSchema) => {
    //             state.isUserBoardsFetching = false;
    //         })
    //         .addCase(FetchUserBoardsByProjectId.fulfilled, (state: BoardSliceSchema, action) => {
    //             state.isUserBoardsFetching = false;
    //         })
    // }
})

export const {actions: MessageActions} = MessageSlice;
export const {reducer: MessageReducer} = MessageSlice;