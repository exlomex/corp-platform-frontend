export interface RegistrationSliceSchema {
    RegisterServiceIsFetching: boolean;
    RegisterServiceError?: string;

    InvitationCodeIsFetching: boolean;
    InvitationCodeIsError?: string;
    InvitationCodeIsActivate: boolean;
}