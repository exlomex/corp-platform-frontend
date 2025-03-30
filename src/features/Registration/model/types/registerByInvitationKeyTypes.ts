export interface registerByInvitationKeyReturnedData {
    accessToken: string;
}

export interface registerByInvitationKeyInputData {
    key: string;
    firstName: string;
    lastName: string;
    password: string;
}