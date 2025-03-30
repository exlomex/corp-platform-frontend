import { classNames } from '@/shared/lib/classNames';
import cls from './RegisterForm.module.scss';
import {InvitationField} from "../InvitationField/InvitationField.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCallback, useEffect} from "react";

interface RegisterFormProps {
    className?: string;
}

export interface RegisterDataInputs {
    registerFirstName: string;
    registerLastName: string;
    registerPassword: string;
    registerEmail: string;
    registerInvitationCode: string;
}

export const RegisterForm = (props: RegisterFormProps) => {
    const { className } = props;

    const { register, handleSubmit, trigger, formState: { errors }, getValues, setValue, reset } = useForm<RegisterDataInputs>()

    const onSubmit: SubmitHandler<RegisterDataInputs> = useCallback(async (data) => {

        // const loginData: LoginByEmailInputData = {
        //     password: data.loginPassword,
        //     email: data.loginEmail,
        // }
        //
        // try {
        //     await dispatch(loginByEmail(loginData)).unwrap()
        // } catch (e) {
        //     console.error(e)
        // }
    }, [])


    const resetInvitationCodeAndEmailValuesFields = useCallback(() => {
        reset({registerInvitationCode: '', registerEmail: ''})
    }, [reset])

    const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i)
    const registerFormEmailReg = register<'registerEmail'>('registerEmail', { required: {value: true, message: 'Заполните обязательное поле'}, pattern: {value: emailPattern, message: 'Введите корректный email'}, onBlur: () => trigger('registerEmail')});
    const registerFormPasswordReg = register<'registerPassword'>("registerPassword", { required: {value: true, message: 'Заполните обязательное поле'}, minLength: {value: 4, message: `Пароль должен быть не короче 4 символов`}, onBlur: () => trigger('registerPassword')})
    const registerFormFirstNameReg = register<'registerFirstName'>("registerFirstName", { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('registerFirstName')})
    const registerFormLastNameReg = register<'registerLastName'>("registerLastName", { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('registerLastName')})

    const registerFormInvitationCodeReg = register<'registerInvitationCode'>("registerInvitationCode", {onBlur: () => trigger('registerInvitationCode')})

    const formValues = getValues()


    return (
        <div className={classNames(cls.RegisterForm, {}, [className])}>
            registerForm
            <InvitationField<RegisterDataInputs>
                register={registerFormInvitationCodeReg}
                id={'registerInvitatonCode'}
                value={formValues.registerInvitationCode}
                resetInvitationCodeAndEmailValuesFields={resetInvitationCodeAndEmailValuesFields}
            />
        </div>
    )
};
