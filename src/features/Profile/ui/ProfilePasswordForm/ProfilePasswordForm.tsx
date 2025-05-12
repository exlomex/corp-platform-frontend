import { classNames } from '@/shared/lib/classNames';
import cls from './ProfilePasswordForm.module.scss';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import CorrectIcon from "@/shared/assets/icons/smallCorrectIcon.svg";
import {Typography} from "@/shared/ui/Typography";
import {
    editPersonalDataService,
    editPersonalDataServiceInputData
} from "@/entities/User/model/services/editPersonalDataService.ts";
import {fetchUserInfo} from "@/features/ProfileTab/model/services/fetchUserInfo.ts";
import {ChangeProfileDataInputs} from "@/features/Profile/ui/ProfilePersonalDataForm/ProfilePersonalDataForm.tsx";
import {useSelector} from "react-redux";
import {
    getEditPasswordError,
    getEditPasswordIsFetching,
    getUserInfo
} from "@/entities/User/model/selectors/getUserValues.ts";
import {editPasswordService, editPasswordServiceInputData} from "@/entities/User/model/services/editPasswordService.ts";

interface ProfilePasswordFormProps {
    className?: string;
}

export interface ChangePasswordInputs {
    password: string;
    submitPassword: string
}

export const ProfilePasswordForm = (props: ProfilePasswordFormProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const { register, handleSubmit, trigger, formState: { errors }, watch, reset } = useForm<ChangePasswordInputs>()

    const passwordValidation = {
        pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,64}$/,
            message: 'Cлабый пароль',
        },
    };
    const passwordReg = register<'password'>("password", {
        ...passwordValidation,
        required: { value: true, message: 'Заполните обязательное поле' },
        onBlur: () => trigger(['password', 'submitPassword']),
    });

    const watchedFields = watch();

    const submitPasswordReg = register<'submitPassword'>("submitPassword", {
        ...passwordValidation,
        validate: value => value === watchedFields.password || 'Пароли не совпадают',
        required: { value: true, message: 'Заполните обязательное поле' },
        onBlur: () => trigger('submitPassword'),
    });

    const userInfo = useSelector(getUserInfo)

    const onSubmitEditPassword: SubmitHandler<ChangePasswordInputs> = async (data) => {
        if (userInfo?.id) {
            const editData: editPasswordServiceInputData = {
                email: userInfo?.email,
                password: data.password,
                lastName: userInfo?.lastName,
                firstName: userInfo?.firstName,
            }

            try {
                await dispatch(editPasswordService(editData)).unwrap()
                await dispatch(fetchUserInfo()).unwrap()
                reset({
                    submitPassword: '',
                    password: ''
                })
            } catch (e) {
                console.error()
            }
        }
    }

    const isFetching = useSelector(getEditPasswordIsFetching)
    const Error = useSelector(getEditPasswordError)

    return (
        <div className={classNames(cls.ProfilePasswordForm, {}, [className])}>
            <form className={cls.Form} autoComplete={'on'} onSubmit={handleSubmit(onSubmitEditPassword)}>
                <InputWrapper
                    className={cls.InputWrapper}
                    labelSize={'S_SIZE'}
                    messageSize={'SMALL_SIZE'}
                    labelString={'Пароль'}
                    labelFor={"password"}
                    message={errors.password}
                    input={
                        <Input<ChangePasswordInputs>
                            type={'TYPE_PASSWORD'}
                            className={cls.Input}
                            register={passwordReg}
                            placeholder={'Введите пароль'}
                            id={'password'}
                            variant={'SMART_INPUT'}
                        />
                    }
                />

                <InputWrapper
                    className={cls.InputWrapper}
                    labelSize={'S_SIZE'}
                    messageSize={'SMALL_SIZE'}
                    labelString={'Повторите пароль'}
                    labelFor={"submitPassword"}
                    message={errors.submitPassword}
                    input={
                        <Input<ChangePasswordInputs>
                            type={'TYPE_PASSWORD'}
                            register={submitPasswordReg}
                            placeholder={'Повторите пароль'}
                            id={'submitPassword'}
                            variant={'SMART_INPUT'}
                        />
                    }
                />

                <div className={cls.ButtonWrapper}>
                    <Button regularType={'submit'} buttonType={'SMART_WITH_ICON_BTN_FILLED'}
                            isLoading={isFetching}>Сменить пароль</Button>
                </div>

                <Typography className={cls.Error} size={'PARAGRAPH-12-REGULAR'}>{Error}</Typography>
            </form>
        </div>
    )
};
