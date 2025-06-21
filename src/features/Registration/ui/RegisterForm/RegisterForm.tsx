import { classNames } from '@/shared/lib/classNames';
import cls from './RegisterForm.module.scss';
import {InvitationField} from "../InvitationField/InvitationField.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCallback, useEffect} from "react";
import {Input} from "@/shared/ui/Input";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Button} from "@/shared/ui/Button";
import {Typography} from "@/shared/ui/Typography";
import {useSelector} from "react-redux";
import {
    getRegisterInvitationCodeIsActivate, getRegisterServiceError,
    getRegisterServiceIsFetching
} from "@/features/Registration/model/selectors/getRegisterValues.ts";
import {registerByEmailInputData} from "@/features/Registration/model/types/registerByEmailTypes.ts";
import {registerByInvitationKeyInputData} from "@/features/Registration/model/types/registerByInvitationKeyTypes.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {RegisterByEmail} from "../../model/services/registerByEmail.ts";
import {RegisterByInvitationKey} from "../../model/services/registerByInvitationKey.ts";
import {Link} from "react-router";
import {getRouteLogin, getRouteRegister} from "@/shared/const/router.ts";
import {UserSliceActions} from "@/entities/User";
import {BoardActions} from "@/entities/Board";
import {ProjectActions} from "@/entities/Project";
import {RegistrationSlice, RegistrationSliceActions} from "@/features/Registration/model/slice/registrationSlice.ts";

interface RegisterFormProps {
    className?: string;
}

export interface RegisterDataInputs {
    registerFirstName: string;
    registerLastName: string;
    password: string;
    email: string;
    registerInvitationCode: string;
}

export const RegisterForm = (props: RegisterFormProps) => {
    const { className } = props;

    const { register, handleSubmit, trigger, formState: { errors }, getValues, reset } = useForm<RegisterDataInputs>()

    const isCodeActivated = useSelector(getRegisterInvitationCodeIsActivate)

    const dispatch = useAppDispatch()

    const isFetching = useSelector(getRegisterServiceIsFetching)

    const onSubmit: SubmitHandler<RegisterDataInputs> = useCallback(async (data) => {
        let registerData: registerByEmailInputData | registerByInvitationKeyInputData

        if (isCodeActivated) {
            registerData = {
                firstName: data.registerFirstName,
                lastName: data.registerLastName,
                password: data.password,
                key: data.registerInvitationCode
            }

            await dispatch(RegisterByInvitationKey(registerData))
        } else {
            registerData = {
                firstName: data.registerFirstName,
                lastName: data.registerLastName,
                email: data.email,
                password: data.password

            }
            await dispatch(RegisterByEmail(registerData))
        }

    }, [dispatch, isCodeActivated])


    const resetInvitationCodeAndEmailValuesFields = useCallback(() => {
        reset({registerInvitationCode: '', email: ''})
    }, [reset])

    const setEmailValue = useCallback((value: string) => {
        reset({email: value})
    }, [reset])

    const emailPattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    const registerFormEmailReg = register<'email'>('email',
        { required: {value: true, message: 'Заполните обязательное поле'},
                pattern: {value: emailPattern, message: 'Введите корректный email'}, onBlur: () => trigger('email')
                });

    const passwordValidation = {
        pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,64}$/,
            message: 'Пароль должен содержать от 8 до 64 символов, включать хотя бы одну заглавную латинскую букву, одну строчную, одну цифру и один спецсимвол',
        },
    };
    const registerFormPasswordReg = register<'password'>("password",
        { required: {value: true, message: 'Заполните обязательное поле'}, ...passwordValidation, onBlur: () => trigger('password')})

    const namePattern = /^[А-Яа-яЁёA-Za-z\s\-']+$/;

    const registerFormFirstNameReg = register<'registerFirstName'>("registerFirstName", {
        required: { value: true, message: 'Заполните обязательное поле' },
        pattern: {
            value: namePattern,
            message: 'Некорректный формат',
        },
        onBlur: () => trigger('registerFirstName'),
    });

    const registerFormLastNameReg = register<'registerLastName'>("registerLastName", {
        required: { value: true, message: 'Заполните обязательное поле' },
        pattern: {
            value: namePattern,
            message: 'Некорректный формат',
        },
        onBlur: () => trigger('registerLastName'),
    });

    const registerFormInvitationCodeReg = register<'registerInvitationCode'>("registerInvitationCode",
        {onBlur: () => trigger('registerInvitationCode')})

    const formValues = getValues()

    const RegisterServiceError = useSelector(getRegisterServiceError)

    useEffect(() => {
        dispatch(RegistrationSliceActions.resetRegistrationSlice())
    }, [dispatch]);

    return (
        <div className={classNames(cls.RegisterForm, {}, [className])}>
            <div className={cls.RegisterFormHeading}>
                <Typography size={"HEADING-H4"} align={'CENTER'} className={cls.HeadingTitle}>Регистрация в
                    TeamSpace</Typography>
                {RegisterServiceError && (<Typography className={cls.HeadingError} align={"CENTER"} size={"PARAGRAPH-16-REGULAR"}>
                    {RegisterServiceError.includes('User') ? 'Пользователь с таким email уже существует.' : RegisterServiceError}
                </Typography>)}
            </div>

            <form autoComplete={'on'} onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.RegisterFieldFlex}>
                    <InputWrapper
                        className={cls.RegisterTopLineField}
                        labelString={'Имя'}
                        required
                        labelFor={"registerFirstName"}
                        message={errors.registerFirstName}
                        input={
                            <Input<RegisterDataInputs>
                                register={registerFormFirstNameReg}
                                placeholder={'Введите имя'}
                                id={'registerFirstName'}
                            />
                        }
                    />

                    <InputWrapper
                        className={cls.RegisterTopLineField}
                        labelString={'Фамилия'}
                        required
                        labelFor={"registerLastName"}
                        message={errors.registerLastName}
                        input={
                            <Input<RegisterDataInputs>
                                register={registerFormLastNameReg}
                                placeholder={'Введите фамилию'}
                                id={'registerLastName'}
                            />
                        }
                    />
                </div>

                <InputWrapper
                    className={cls.RegisterField}
                    labelString={'Email'}
                    required
                    labelFor={"email"}
                    message={errors.email}
                    input={
                        <Input<RegisterDataInputs>
                            disabled={isCodeActivated}
                            register={registerFormEmailReg}
                            id={"email"}
                            placeholder={'Введите email'}
                        />
                    }
                />

                <InputWrapper
                    className={cls.RegisterField}
                    labelString={'Пароль'}
                    required
                    labelFor={"password"}
                    message={errors.password}
                    input={
                        <Input<RegisterDataInputs>
                            type={'TYPE_PASSWORD'}
                            register={registerFormPasswordReg}
                            id={"password"}
                            placeholder={'Введите пароль'}
                        />
                    }
                />

                <InvitationField<RegisterDataInputs>
                    className={cls.RegisterField}
                    register={registerFormInvitationCodeReg}
                    id={'registerInvitationCode'}
                    value={formValues.registerInvitationCode}
                    resetInvitationCodeAndEmailValuesFields={resetInvitationCodeAndEmailValuesFields}
                    setEmailValue={setEmailValue}
                />

                <Button regularType={'submit'} isLoading={isFetching} fullWidth>Зарегистрироваться</Button>
            </form>

            <div className={cls.BottomFormContent}>
                <Typography className={cls.BottomLineText} size={'PARAGRAPH-18-REGULAR'}>Уже есть аккаунт?</Typography>
                <Link to={getRouteLogin()} className={cls.BottomLineLink}>Войти</Link>
            </div>
        </div>
    )
};
