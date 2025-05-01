import {StateSchema} from "@/app/providers/Store";
import {PasswordRecoverySliceSchema} from "@/features/PasswordRecovery";
import {createSelector} from "@reduxjs/toolkit";

export const passwordRecoveryValues = (state: StateSchema) => state.passwordRecovery;

export const getPasswordRecoveryStepCount = createSelector(
    passwordRecoveryValues, (state: PasswordRecoverySliceSchema) => {return state.stepCount}
)

export const getPasswordRecoveryIsSendCodeFetching = createSelector(
    passwordRecoveryValues, (state: PasswordRecoverySliceSchema) => {return state.isSendCodeFetching}
)

export const getPasswordRecoveryIsCheckCodeFetching = createSelector(
    passwordRecoveryValues, (state: PasswordRecoverySliceSchema) => {return state.isCheckCodeFetching}
)

export const getPasswordRecoveryCheckCodeError = createSelector(
    passwordRecoveryValues, (state: PasswordRecoverySliceSchema) => {return state.checkCodeError}
)

export const getPasswordRecoveryVerificationCode = createSelector(
    passwordRecoveryValues, (state: PasswordRecoverySliceSchema) => {return state.verificationCode}
)

export const getPasswordIsChangePassFetching = createSelector(
    passwordRecoveryValues, (state: PasswordRecoverySliceSchema) => {return state.isChangePassFetching}
)

export const getPasswordChangeError = createSelector(
    passwordRecoveryValues, (state: PasswordRecoverySliceSchema) => {return state.changePassError}
)