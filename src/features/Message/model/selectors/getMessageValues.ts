import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {MessageSliceSchema} from "@/features/Message/model/types/messageSliceSchema.ts";

export const getMessageValues = (state: StateSchema) => state.message

export const getReceivedMessages = createSelector(
    getMessageValues, (state: MessageSliceSchema) => {
        return state.receivedMessages
    }
)

export const getSentMessages = createSelector(getMessageValues,
    (state: MessageSliceSchema) => state.sentMessages
)

export const getMessageInfo = createSelector(getMessageValues,
    (state: MessageSliceSchema) => state.messageInfo
)

export const getNewMessageIsOpen = createSelector(getMessageValues,
    (state: MessageSliceSchema) => state.newMessageModalIsOpen
)

export const getMessageInfoIsFetching = createSelector(getMessageValues,
    (state: MessageSliceSchema) => state.messageInfoIsFetching
)

export const getMessageIsFetching = createSelector(getMessageValues,
    (state: MessageSliceSchema) => state.messagesIsFetching
)