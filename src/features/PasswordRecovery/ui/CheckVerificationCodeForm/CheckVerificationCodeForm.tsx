import { classNames } from '@/shared/lib/classNames';
import cls from './CheckVerificationCodeForm.module.scss';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCallback} from "react";
import {
    checkVerificationCodeService,
    checkVerificationCodeServiceInputData
} from "../../model/services/checkVerificationCodeService.ts";
import {useSelector} from "react-redux";
import {
        getPasswordRecoveryIsCheckCodeFetching, getPasswordRecoveryStepCount,
} from "../../model/selectors/getPasswordRecoveryValues.ts";
import {Typography} from "@/shared/ui/Typography";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {PasswordRecoveryActions} from "@/features/PasswordRecovery";

interface CheckVerificationCodeFormProps {
    className?: string;
}

interface CheckVerificationCodeDataInputs {
    value: string;
}

export const CheckVerificationCodeForm = (props: CheckVerificationCodeFormProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()

    const { register, handleSubmit, trigger, formState: { errors }, setError } = useForm<CheckVerificationCodeDataInputs>()


    const onCheckVerificationCodeSubmit: SubmitHandler<CheckVerificationCodeDataInputs> = useCallback(async (data) => {
        const verificationData: checkVerificationCodeServiceInputData = {
            value: data.value
        }

        try {
            await dispatch(checkVerificationCodeService(verificationData)).unwrap()
            dispatch(PasswordRecoveryActions.setVerificationCode(String(data.value)))
        } catch (e) {
            await setError('value', {message: e})
            console.log(errors);
        }
    }, [dispatch, errors, setError])

    const verificationCodeValueReg = register<'value'>("value", { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('value')});

    const isFetching = useSelector(getPasswordRecoveryIsCheckCodeFetching)
    const currentStep = useSelector(getPasswordRecoveryStepCount)

    const onPrevButtonClickHandler = () => {
        const prevStep = currentStep - 1
        if (prevStep === 1) {
            dispatch(PasswordRecoveryActions.setStep(prevStep))
        }
    }

    return (
        <div className={classNames(cls.CheckVerificationCodeForm, {}, [className])}>
            <Typography align={'LEFT'} className={cls.CheckCodeHeading} size={"PARAGRAPH-18-REGULAR"}>Введите полученный код восстановления</Typography>

            <form onSubmit={handleSubmit(onCheckVerificationCodeSubmit)}>
                <InputWrapper
                    required
                    labelFor={"value"}
                    message={errors.value}
                    className={cls.InputWrapper}
                    input={
                        <Input<CheckVerificationCodeDataInputs>
                            register={verificationCodeValueReg}
                            placeholder={'Код восстановления'}
                            id={'value'}
                        />
                    }
                />

                <div className={cls.CheckFormBottomLine}>
                    <Button className={cls.SubmitButton} isLoading={isFetching} regularType={'submit'} fullWidth>Продолжить</Button>
                    <Button onClick={onPrevButtonClickHandler} buttonType={'TEXT_BTN_TRANSPARENT'}>Назад</Button>
                </div>
            </form>
        </div>
    )
};
