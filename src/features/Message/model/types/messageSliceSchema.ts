import {File} from "@/features/File";

export interface MessageUser {
    id: number,
    firstName: string,
    lastName: string,
    imageUrl?: string
}

export interface MessageI {
    id: number,
    title: string,
    text: string,
    from: MessageUser
    to: MessageUser
    isRead: boolean,
    sentAt: string
    files: File[]
}

export interface MessageSliceSchema {
    notReadMessagesCount?: number;

    sentMessages?: MessageI[]
    receivedMessages?: MessageI[]

    messageInfo?: MessageI

    newMessageModalIsOpen: boolean
}