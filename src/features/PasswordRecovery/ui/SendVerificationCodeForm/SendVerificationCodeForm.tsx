import { classNames } from '@/shared/lib/classNames';
import {Typography} from "@/shared/ui/Typography";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCallback} from "react";
import cls from './SendVerificationCodeForm.module.scss';
import {
    sendVerificationCodeService,
    sendVerificationCodeServiceInputData
} from "../../model/services/sendVerificationCodeService.ts";
import {useSelector} from "react-redux";
import {
    getPasswordRecoveryIsSendCodeFetching
} from "../../model/selectors/getPasswordRecoveryValues.ts";


interface SendVerificationCodeFormProps {
    className?: string;
}

interface SendVerificationCodeDataInputs {
    email: string
}

export const SendVerificationCodeForm = (props: SendVerificationCodeFormProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()


    const { register, handleSubmit, trigger, formState: { errors } } = useForm<SendVerificationCodeDataInputs>()

    const onSendVerificationCodeSubmit: SubmitHandler<SendVerificationCodeDataInputs> = useCallback(async (data) => {
        const verificationData: sendVerificationCodeServiceInputData = {
            email: data.email
        }

        await dispatch(sendVerificationCodeService(verificationData))
    }, [dispatch])

    const emailPattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    const verificationCodeEmailReg = register<'email'>("email", { required: {value: true, message: 'Заполните обязательное поле'}, pattern: {value: emailPattern, message: 'Введите корректный email'}, onBlur: () => trigger('email')});

    const isFetching = useSelector(getPasswordRecoveryIsSendCodeFetching)

    return (
        <div className={classNames(cls.SendVerificationCodeForm, {}, [className])}>
            <Typography align={'CENTER'} className={cls.SendCodeHeading} size={"HEADING-H4"}>Забыли пароль?</Typography>

            <form onSubmit={handleSubmit(onSendVerificationCodeSubmit)}>
                <InputWrapper
                    labelString={'Введите email'}
                    required
                    labelFor={"email"}
                    message={errors.email}
                    className={cls.InputWrapper}
                    input={
                        <Input<SendVerificationCodeDataInputs>
                            register={verificationCodeEmailReg}
                            placeholder={'email'}
                            id={'email'}
                        />
                    }
                />

                <Button isLoading={isFetching} regularType={'submit'} className={cls.SendCodeButton} fullWidth>Отправить код восстановления</Button>
            </form>
        </div>
    );
};
