import { classNames } from '@/shared/lib/classNames';
import cls from './LoginForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginByEmailInputData} from "@/features/Authorization/model/types/authTypes.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {loginByEmail} from "@/features/Authorization/model/services/loginByEmail.ts";
import {useLocation, useNavigate} from "react-router";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {useEffect} from "react";

interface LoginFormProps {
    className?: string;
}

export interface loginDataInputs {
    loginEmail: string;
    loginPassword: string
}

export const LoginForm = (props: LoginFormProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from | '/'

    const { register, handleSubmit, trigger, formState: { errors } } = useForm<loginDataInputs>()

    const onSubmit: SubmitHandler<loginDataInputs> = async (data) => {
        const loginData: LoginByEmailInputData = {
            password: data.loginPassword,
            email: data.loginEmail,
        }

        try {
            await dispatch(loginByEmail(loginData)).unwrap()
            navigate(fromPage)
        } catch (e) {
            console.error(e)
        }
    }

    const loginFormEmailReg = register<'loginEmail'>('loginEmail', { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('loginEmail')});
    const loginFormPasswordReg = register<'loginPassword'>("loginPassword", { required: true, minLength: {value: 4, message: `Пароль должен быть не короче 4 символов`}, onBlur: () => trigger('loginPassword')})

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input<loginDataInputs>
                    register={loginFormEmailReg}
                    placeholder={'email'}
                    id={'loginEmail'}
                />

                <InputWrapper<loginDataInputs>
                    labelString={'Пароль'}
                    labelFor={'loginPassword'}
                    input={
                        <Input<loginDataInputs>
                            register={loginFormPasswordReg}
                            placeholder={'password'}
                            id={'loginPassword'}
                        />
                    }
                    error={errors.loginPassword}
                />

                <Button>Войти</Button>
            </form>
        </div>
    )
};
