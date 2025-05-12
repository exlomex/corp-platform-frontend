import {StateSchema} from "@/app/providers/Store";
import {createSelector} from "@reduxjs/toolkit";
import {MessageSliceSchema} from "@/features/Message/model/types/messageSliceSchema.ts";

export const getMessageValues = (state: StateSchema) => state.message

export const getReceivedMessages = createSelector(
    getMessageValues, (state: MessageSliceSchema) => {
        return state.receivedMessages
    }
)

export const getSentMessages = createSelector(
    getMessageValues, (state: MessageSliceSchema) => {
        return state.sentMessages
    }
)