export interface PasswordRecoverySliceSchema {
    stepCount: 1 | 2 | 3;

    verificationCode?: string;

    isSendCodeFetching: boolean
    isCheckCodeFetching: boolean
    checkCodeError?: string
    isChangePassFetching: boolean
    changePassError?: string
}