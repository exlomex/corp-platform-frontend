import { classNames } from '@/shared/lib/classNames';
import cls from './InviteToCompanyForm.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {FieldError, SubmitHandler, useForm} from "react-hook-form";
import {memo, useCallback, useEffect, useMemo} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {inviteToCompanyService, inviteToCompanyServiceInputData} from "../model/services/inviteToCompanyService.ts";
import {
    getInviteToCompanyIsError,
    getInviteToCompanyIsFetching,
    inviteToCompanyActions
} from "@/features/InviteToCompany";
import {shallowEqual, useSelector} from "react-redux";

interface InviteToCompanyFormProps {
    className?: string;
}

interface InviteToCompanyFormDataInputs {
    InviteCompanyEmail: string
}

export const InviteToCompanyForm = memo((props: InviteToCompanyFormProps) => {
    const { className } = props;

    const { register, handleSubmit, trigger, formState: { errors } } = useForm<InviteToCompanyFormDataInputs>()

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<InviteToCompanyFormDataInputs> = useCallback(async (data) => {
        const inviteData: inviteToCompanyServiceInputData = {
            email: data.InviteCompanyEmail
        }

        await dispatch(inviteToCompanyService(inviteData))
    }, [dispatch])

    const isLoading = useSelector(getInviteToCompanyIsFetching)
    const isError = useSelector(getInviteToCompanyIsError, shallowEqual)

    const emailPattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

    const ErrorObject: FieldError | string | undefined = useMemo(() => {
        return errors.InviteCompanyEmail || isError
    }, [errors.InviteCompanyEmail, isError])

    const inviteCompanyEmailReg = register<'InviteCompanyEmail'>('InviteCompanyEmail', { required: {value: true, message: 'Заполните обязательное поле'}, pattern: {value: emailPattern, message: 'Введите корректный email'}, onBlur: () => trigger('InviteCompanyEmail'), onChange: () => {
        if (isError) {
            dispatch(inviteToCompanyActions.clearError())
        }
    }});

    return (
        <div className={classNames(cls.InviteToCompanyForm, {}, [className])}>
            <Typography className={cls.HeadingForm} size={'PARAGRAPH-16-REGULAR'}>Пригласить в компанию</Typography>

            <form className={cls.Form} onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper
                    className={cls.InputWrapper}
                    message={ErrorObject}
                    messageSize={'SMALL_SIZE'}
                    messageColor={typeof ErrorObject === "string" && ErrorObject.split('')[0] === 'П' ? 'GREEN' : 'RED'}
                    input={
                        <Input<InviteToCompanyFormDataInputs>
                            register={inviteCompanyEmailReg}
                            id={'InviteCompanyEmail'}
                            placeholder={'Введите email'}
                            variant={'SMART_INPUT'}
                        />
                    }
                />

                <Button isLoading={isLoading} buttonType={'SMART_TEXT_BTN_FILLED'} regularType={'submit'}>Отправить</Button>
            </form>
        </div>
    )
});
