import { classNames } from '@/shared/lib/classNames';
import cls from './EnterNewPasswordForm.module.scss';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {
    getPasswordChangeError,
    getPasswordIsChangePassFetching, getPasswordRecoveryStepCount,
    getPasswordRecoveryVerificationCode
} from "../../model/selectors/getPasswordRecoveryValues.ts";
import {
    changePasswordService,
    changePasswordServiceInputData
} from "../../model/services/changePasswordService.ts";
import {Typography} from "@/shared/ui/Typography";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {PasswordRecoveryActions} from "@/features/PasswordRecovery";

interface EnterNewPasswordFormProps {
    className?: string;
}

interface EnterNewPasswordInputData {
    inputPassword: string;
    secondInputPassword: string;
}

export const EnterNewPasswordForm = (props: EnterNewPasswordFormProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()

    const { register, handleSubmit, trigger, formState: { errors }, watch } = useForm<EnterNewPasswordInputData>()

    const verificationCode = useSelector(getPasswordRecoveryVerificationCode)

    const onEnterChangePasswordSubmit: SubmitHandler<EnterNewPasswordInputData> = useCallback(async (data) => {
        const changePassData: changePasswordServiceInputData = {
            code: verificationCode,
            password: data.inputPassword,
            confirmPassword: data.secondInputPassword
        }

        await dispatch(changePasswordService(changePassData))
    }, [dispatch, verificationCode])

    const passwordValidation = {
        pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,64}$/,
            message: 'Пароль должен содержать от 8 до 64 символов, включать хотя бы одну заглавную латинскую букву, одну строчную, одну цифру и один спецсимвол',
        },
    };
    const passwordReg = register<'inputPassword'>("inputPassword", {...passwordValidation, required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('inputPassword')});
    const watchedFields = watch();
    const confirmPasswordReg = register<'secondInputPassword'>("secondInputPassword",
        {...passwordValidation,
            validate: value => value === watchedFields.inputPassword || 'Пароли не совпадают',
            required: {value: true, message: 'Заполните обязательное поле'},
            onBlur: () => trigger('secondInputPassword')});

    const isFetching = useSelector(getPasswordIsChangePassFetching)
    const changeError = useSelector(getPasswordChangeError)
    const currentStep = useSelector(getPasswordRecoveryStepCount)
    const onPrevButtonClickHandler = () => {
        const prevStep = currentStep - 1
        if (prevStep === 2) {
            dispatch(PasswordRecoveryActions.setStep(prevStep))
        }
    }

    useEffect(() => {
        dispatch(PasswordRecoveryActions.setPasswordChangeError(undefined))
    }, [dispatch])

    return (
        <div className={classNames(cls.EnterNewPasswordForm, {}, [className])}>
            <Typography align={'CENTER'} className={cls.Heading} size={"TEXT-26-SEMIBOLD"}>Укажите новые данные</Typography>
            <span className={cls.ChangeError}>{changeError}</span>

            <form onSubmit={handleSubmit(onEnterChangePasswordSubmit)}>
                <InputWrapper
                    required
                    labelString={'Пароль'}
                    labelFor={"inputPassword"}
                    message={errors.inputPassword}
                    className={cls.InputWrapper}
                    input={
                        <Input<EnterNewPasswordInputData>
                            register={passwordReg}
                            placeholder={'Пароль'}
                            id={'inputPassword'}
                            autoComplete={'off'}
                        />
                    }
                />

                <InputWrapper
                    required
                    labelString={'Подтверждение пароля'}
                    labelFor={"secondInputPassword"}
                    message={errors.secondInputPassword}
                    className={cls.InputWrapper}
                    input={
                        <Input<EnterNewPasswordInputData>
                            register={confirmPasswordReg}
                            placeholder={'Подтверждение пароля'}
                            id={'secondInputPassword'}
                            autoComplete={'off'}
                        />
                    }
                />

                <div className={cls.EnterPassFromBottomLine}>
                    <Button isLoading={isFetching} regularType={'submit'} fullWidth>Сменить пароль</Button>
                    <Button onClick={onPrevButtonClickHandler} buttonType={'TEXT_BTN_TRANSPARENT'}>Назад</Button>
                </div>
            </form>
        </div>
    )
};
