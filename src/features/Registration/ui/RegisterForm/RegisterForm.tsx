import { classNames } from '@/shared/lib/classNames';
import cls from './RegisterForm.module.scss';
import {InvitationField} from "../InvitationField/InvitationField.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCallback} from "react";
import {Input} from "@/shared/ui/Input";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Button} from "@/shared/ui/Button";
import {Typography} from "@/shared/ui/Typography";
import {useSelector} from "react-redux";
import {getRegisterInvitationCodeIsActivate} from "@/features/Registration/model/selectors/getRegisterValues.ts";
import {registerByEmailInputData} from "@/features/Registration/model/types/registerByEmailTypes.ts";
import {registerByInvitationKeyInputData} from "@/features/Registration/model/types/registerByInvitationKeyTypes.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {RegisterByEmail} from "../../model/services/registerByEmail.ts";
import {RegisterByInvitationKey} from "../../model/services/registerByInvitationKey.ts";

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

    const isCodeActivated = useSelector(getRegisterInvitationCodeIsActivate)

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<RegisterDataInputs> = useCallback(async (data) => {
        let registerData: registerByEmailInputData | registerByInvitationKeyInputData

        if (isCodeActivated) {
            registerData = {
                firstName: data.registerFirstName,
                lastName: data.registerLastName,
                password: data.registerPassword,
                key: data.registerInvitationCode
            }

            console.log(registerData);
            console.log('byCode');
            await dispatch(RegisterByInvitationKey(registerData))
        } else {
            registerData = {
                firstName: data.registerFirstName,
                lastName: data.registerLastName,
                email: data.registerEmail,
                password: data.registerPassword

            }
            await dispatch(RegisterByEmail(registerData))
        }

    }, [dispatch, isCodeActivated])


    const resetInvitationCodeAndEmailValuesFields = useCallback(() => {
        reset({registerInvitationCode: '', registerEmail: ''})
    }, [reset])

    const setEmailValue = useCallback((value: string) => {
        reset({registerEmail: value})
    }, [reset])

    const emailPattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    const registerFormEmailReg = register<'registerEmail'>('registerEmail', { required: {value: true, message: 'Заполните обязательное поле'}, pattern: {value: emailPattern, message: 'Введите корректный email'}, onBlur: () => trigger('registerEmail')});

    const passwordValidation = {
        pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,64}$/,
            message: 'Пароль должен содержать от 8 до 64 символов, включать хотя бы одну заглавную латинскую букву, одну строчную, одну цифру и один спецсимвол',
        },
    };
    const registerFormPasswordReg = register<'registerPassword'>("registerPassword", { required: {value: true, message: 'Заполните обязательное поле'}, ...passwordValidation, onBlur: () => trigger('registerPassword')})

    const registerFormFirstNameReg = register<'registerFirstName'>("registerFirstName", { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('registerFirstName')})
    const registerFormLastNameReg = register<'registerLastName'>("registerLastName", { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('registerLastName')})

    const registerFormInvitationCodeReg = register<'registerInvitationCode'>("registerInvitationCode", {onBlur: () => trigger('registerInvitationCode')})

    const formValues = getValues()

    return (
        <div className={classNames(cls.RegisterForm, {}, [className])}>
            <Typography size={"HEADING-H4"} align={'CENTER'} className={cls.RegisterFormHeading}>Регистрация в TeamSpace</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.RegisterFieldFlex}>
                    <InputWrapper
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
                    labelFor={"registerEmail"}
                    message={errors.registerEmail}
                    input={
                        <Input<RegisterDataInputs>
                            disabled={isCodeActivated}
                            register={registerFormEmailReg}
                            id={"registerEmail"}
                            placeholder={'Введите email'}
                        />
                    }
                />

                <InputWrapper
                    className={cls.RegisterField}
                    labelString={'Пароль'}
                    required
                    labelFor={"registerPassword"}
                    message={errors.registerPassword}
                    input={
                        <Input<RegisterDataInputs>
                            type={'TYPE_PASSWORD'}
                            register={registerFormPasswordReg}
                            id={"registerPassword"}
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

                <Button regularType={'submit'} fullWidth>Зарегистрироваться</Button>
            </form>
        </div>
    )
};
