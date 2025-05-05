export interface RegistrationSliceSchema {
    RegisterServiceIsFetching: boolean;
    InvitationCodeIsFetching: boolean;
    InvitationCodeIsError?: string;
    InvitationCodeIsActivate: boolean;
}