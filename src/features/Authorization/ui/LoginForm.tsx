import { classNames } from '@/shared/lib/classNames';
import cls from './LoginForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginByEmailInputData} from "@/features/Authorization/model/types/authTypes.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {loginByEmail} from "@/features/Authorization/model/services/loginByEmail.ts";
import {useNavigate} from "react-router";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";

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

    const { register, handleSubmit, trigger, formState: { errors } } = useForm<loginDataInputs>()

    const onSubmit: SubmitHandler<loginDataInputs> = async (data) => {
        const loginData: LoginByEmailInputData = {
            password: data.loginPassword,
            email: data.loginEmail,
        }

        try {
            await dispatch(loginByEmail(loginData)).unwrap()
            // navigate(fromPage)
        } catch (e) {
            console.error(e)
        }
    }

    const loginFormEmailReg = register<'loginEmail'>('loginEmail', { required: true, onBlur: () => trigger('loginEmail')});
    const loginFormPasswordReg = register<'loginPassword'>("loginPassword", { required: true, minLength: 4, onBlur: () => trigger('loginPassword')})

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input<loginDataInputs>
                    register={loginFormEmailReg}
                    placeholder={'email'}
                    id={'loginEmail'}
                />
                <Input<loginDataInputs>
                    register={loginFormPasswordReg}
                    placeholder={'password'}
                    id={'loginPassword'}
                />
                <Button>Войти</Button>
            </form>
        </div>
    )
};
