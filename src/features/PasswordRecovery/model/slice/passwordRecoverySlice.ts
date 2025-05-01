import {PasswordRecoverySliceSchema} from "@/features/PasswordRecovery/model/types/passwordRecoverySliceSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {sendVerificationCodeService} from "../services/sendVerificationCodeService.ts";
import {checkVerificationCodeService} from "../services/checkVerificationCodeService.ts";
import {changePasswordService} from "../services/changePasswordService.ts";

const initialState: PasswordRecoverySliceSchema = {
    stepCount: 1,
    isSendCodeFetching: false,
    isCheckCodeFetching: false,
    isChangePassFetching: false,
};

export const PasswordRecoverySlice = createSlice({
    name: 'passwordRecovery',
    initialState,
    reducers: {
        setStep: (state: PasswordRecoverySliceSchema, action: PayloadAction<PasswordRecoverySliceSchema['stepCount']>) => {
            state.stepCount = action.payload;
        },
        setVerificationCode: (state: PasswordRecoverySliceSchema, action: PayloadAction<string>) => {
            state.verificationCode = action.payload;
        },
        setPasswordChangeError: (state: PasswordRecoverySliceSchema, action) => {
            state.changePassError = action.payload
        }
    },
    extraReducers: (builder ) => {
        builder
            .addCase(sendVerificationCodeService.pending, (state: PasswordRecoverySliceSchema) => {
                state.isSendCodeFetching = true;
            })
            .addCase(sendVerificationCodeService.fulfilled, (state: PasswordRecoverySliceSchema) => {
                state.isSendCodeFetching = false;
            })
            .addCase(sendVerificationCodeService.rejected, (state: PasswordRecoverySliceSchema) => {
                state.isSendCodeFetching = false;
            })
            // check verification
            .addCase(checkVerificationCodeService.pending, (state: PasswordRecoverySliceSchema) => {
                state.isCheckCodeFetching = true;
                state.checkCodeError = undefined;
            })
            .addCase(checkVerificationCodeService.fulfilled, (state: PasswordRecoverySliceSchema) => {
                state.isCheckCodeFetching = false;
            })
            .addCase(checkVerificationCodeService.rejected, (state: PasswordRecoverySliceSchema, action) => {
                state.isCheckCodeFetching = false;
                state.checkCodeError = action.payload;
            })
            // change pass
            .addCase(changePasswordService.pending, (state: PasswordRecoverySliceSchema) => {
                state.isChangePassFetching = true;
            })
            .addCase(changePasswordService.fulfilled, (state: PasswordRecoverySliceSchema) => {
                state.isChangePassFetching = false;
            })
            .addCase(changePasswordService.rejected, (state: PasswordRecoverySliceSchema, action) => {
                state.isChangePassFetching = false;
                state.changePassError = action.payload;
            })
    },
});

export const { actions: PasswordRecoveryActions } = PasswordRecoverySlice;
export const { reducer: PasswordRecoveryReducer } = PasswordRecoverySlice;