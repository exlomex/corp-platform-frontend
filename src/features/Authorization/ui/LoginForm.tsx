import { classNames } from '@/shared/lib/classNames';
import cls from './LoginForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginByEmailInputData} from "@/features/Authorization/model/types/authTypes.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {loginByEmail} from "@/features/Authorization/model/services/loginByEmail.ts";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Typography} from "@/shared/ui/Typography";
import {useSelector} from "react-redux";
import {getUserLoginError, getUserLoginIsFetching, UserSliceActions} from "@/entities/User";
import {useCallback, useEffect} from "react";
import {Link} from "react-router";
import {getRouteRegister} from "@/shared/const/router.ts";
import {BoardActions} from "@/entities/Board";
import {ProjectActions} from "@/entities/Project";


interface LoginFormProps {
    className?: string;
}

export interface loginDataInputs {
    email: string;
    password: string
}

export const LoginForm = (props: LoginFormProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(UserSliceActions.resetUser())
        dispatch(BoardActions.resetBoards())
        dispatch(ProjectActions.resetProjects())
    }, [dispatch]);

    const loginError = useSelector(getUserLoginError)
    const loginIsFetching = useSelector(getUserLoginIsFetching)

    const { register, handleSubmit, trigger, formState: { errors } } = useForm<loginDataInputs>()

    const onSubmit: SubmitHandler<loginDataInputs> = useCallback(async (data) => {

        const loginData: LoginByEmailInputData = {
            password: data.password,
            email: data.email,
        }

        await dispatch(loginByEmail(loginData))
    }, [dispatch])

    const emailPattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

    const loginFormEmailReg = register<'email'>('email', { required: {value: true, message: 'Заполните обязательное поле'}, pattern: {value: emailPattern, message: 'Введите корректный email'}, onBlur: () => trigger('email')});
    const loginFormPasswordReg = register<'password'>("password", { required: {value: true, message: 'Заполните обязательное поле'}, minLength: {value: 4, message: `Пароль должен быть не короче 4 символов`}, onBlur: () => trigger('password')})

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <div className={cls.Heading}>
                <Typography className={cls.HeadingText} size={"HEADING-H4"} align={'CENTER'}>Войти в TeamSpace</Typography>
                {loginError && <span className={cls.HeadingError}>{loginError.split('')[1]==='r' ? 'Неверный email или пароль.' : loginError}</span>}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete={'on'}>
                <InputWrapper<loginDataInputs>
                    className={cls.Input}
                    labelFor={'email'}
                    labelString={'Email'}
                    message={errors.email}
                    input={
                        <Input<loginDataInputs>
                            name={'email'}
                            register={loginFormEmailReg}
                            placeholder={'Введите email'}
                            id={'email'}
                        />
                    }
                />

                <InputWrapper<loginDataInputs>
                    className={cls.Input}
                    labelString={'Пароль'}
                    labelFor={'password'}
                    input={
                        <Input<loginDataInputs>
                            register={loginFormPasswordReg}
                            placeholder={'Введите пароль'}
                            id={'password'}
                            type={'TYPE_PASSWORD'}
                            autoComplete={"current-password"}
                        />
                    }
                    message={errors.password}
                    isForgotPasswordLabel
                />

                <Button regularType={'submit'} fullWidth isLoading={loginIsFetching}>Войти</Button>
            </form>

            <div className={cls.BottomFormContent}>
                <Typography className={cls.BottomLineText} size={'PARAGRAPH-18-REGULAR'}>Еще нет аккаунта?</Typography>
                <Link to={getRouteRegister()} className={cls.BottomLineLink}>Регистрация</Link>
            </div>
        </div>
    )
};
