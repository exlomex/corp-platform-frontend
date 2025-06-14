import {MessageI, MessageSliceSchema} from "@/features/Message/model/types/messageSliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FetchMessageInfoService} from "../services/fetchMessageInfoService";
import {FetchReceivedMessagesService} from "../services/fetchReceivedMessagesService.ts";
import {FetchSentMessagesService} from "../services/fetchSentMessagesService.ts";


const initialState: MessageSliceSchema = {
    newMessageModalIsOpen: false,
    messageInfoIsFetching: false,
    messagesIsFetching: false,
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
    extraReducers: (builder) => {
        builder
            .addCase(FetchMessageInfoService.pending, (state) => {
                state.messageInfoIsFetching = true;
            })
            .addCase(FetchMessageInfoService.rejected, (state) => {
                state.messageInfoIsFetching = false;
            })
            .addCase(FetchMessageInfoService.fulfilled, (state, action) => {
                state.messageInfoIsFetching = false;
            })
            // received messages
            .addCase(FetchReceivedMessagesService.pending, (state) => {
                state.messagesIsFetching = true;
            })
            .addCase(FetchReceivedMessagesService.rejected, (state) => {
                state.messagesIsFetching = false;
            })
            .addCase(FetchReceivedMessagesService.fulfilled, (state, action) => {
                state.messagesIsFetching = false;
            })
            // sent messages
            .addCase(FetchSentMessagesService.pending, (state) => {
                state.messagesIsFetching = true;
            })
            .addCase(FetchSentMessagesService.rejected, (state) => {
                state.messagesIsFetching = false;
            })
            .addCase(FetchSentMessagesService.fulfilled, (state, action) => {
                state.messagesIsFetching = false;
            })
    }
})

export const {actions: MessageActions} = MessageSlice;
export const {reducer: MessageReducer} = MessageSlice;