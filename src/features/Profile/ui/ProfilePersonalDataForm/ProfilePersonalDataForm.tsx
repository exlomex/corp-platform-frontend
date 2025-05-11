import { classNames } from '@/shared/lib/classNames';
import cls from './ProfilePersonalDataForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {InputWrapper} from "@/shared/ui/InputWrapper";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {useSelector} from "react-redux";
import {
    getEditPersonalDataError,
    getEditPersonalDataIsFetching, getUserInfo
} from "@/entities/User/model/selectors/getUserValues.ts";
import CorrectIcon from '@/shared/assets/icons/smallCorrectIcon.svg'
import {Typography} from "@/shared/ui/Typography";
import {useEffect} from "react";
import {
    editPersonalDataService,
    editPersonalDataServiceInputData
} from "@/entities/User/model/services/editPersonalDataService.ts";
import {fetchUserInfo} from "@/features/ProfileTab/model/services/fetchUserInfo.ts";


interface ProfilePersonalDataFormProps {
    className?: string;
}

export interface ChangeProfileDataInputs {
    firstName: string;
    lastName: string;
    email: string;
}

export const ProfilePersonalDataForm = (props: ProfilePersonalDataFormProps) => {
    const { className } = props;

    const { register, handleSubmit, trigger, formState: { errors }, getValues, reset } = useForm<ChangeProfileDataInputs>()
    const dispatch = useAppDispatch()

    const emailPattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    const editFormEmailReg = register<'email'>('email',
        { required: {value: true, message: 'Заполните обязательное поле'},
            pattern: {value: emailPattern, message: 'Введите корректный email'}, onBlur: () => trigger('email')
        });

    const editFormFirstNameReg = register<'firstName'>("firstName",
        { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('firstName')})
    const editFormLastNameReg = register<'lastName'>("lastName",
        { required: {value: true, message: 'Заполните обязательное поле'}, onBlur: () => trigger('lastName')})

    const onSubmitEditPersonalData: SubmitHandler<ChangeProfileDataInputs> = async (data) => {
        const editData: editPersonalDataServiceInputData = {
            email: data.email,
            password: null,
            lastName: data.lastName,
            firstName: data.firstName
        }

        try {
            await dispatch(editPersonalDataService(editData)).unwrap()
            await dispatch(fetchUserInfo()).unwrap()
        } catch (e) {
            console.error()
        }
    }

    const isFetching = useSelector(getEditPersonalDataIsFetching);
    const Error = useSelector(getEditPersonalDataError)

    const userInfo = useSelector(getUserInfo)

    useEffect(() => {
        if (userInfo?.id) {
            reset({
                firstName: userInfo.firstName || '',
                lastName: userInfo.lastName || '',
                email: userInfo.email || '',
            });
        }
    }, [userInfo]);

    return (
        <div className={classNames(cls.ProfilePersonalDataForm, {}, [className])}>
            <form className={cls.Form} autoComplete={'on'} onSubmit={handleSubmit(onSubmitEditPersonalData)}>
                    <InputWrapper
                        labelSize={'S_SIZE'}
                        messageSize={'SMALL_SIZE'}
                        labelString={'Имя'}
                        labelFor={"firstName"}
                        message={errors.firstName}
                        input={
                            <Input<ChangeProfileDataInputs>
                                register={editFormFirstNameReg}
                                placeholder={'Введите имя'}
                                id={'firstName'}
                                variant={'SMART_INPUT'}
                            />
                        }
                    />

                    <InputWrapper
                        labelSize={'S_SIZE'}
                        messageSize={'SMALL_SIZE'}
                        labelString={'Фамилия'}
                        labelFor={"lastName"}
                        message={errors.lastName}
                        input={
                            <Input<ChangeProfileDataInputs>
                                register={editFormLastNameReg}
                                placeholder={'Введите фамилию'}
                                id={'lastName'}
                                variant={'SMART_INPUT'}
                            />
                        }
                    />

                <InputWrapper
                    labelSize={'S_SIZE'}
                    messageSize={'SMALL_SIZE'}
                    labelString={'Email'}
                    labelFor={"email"}
                    message={errors.email}
                    input={
                        <Input<ChangeProfileDataInputs>
                            register={editFormEmailReg}
                            id={"email"}
                            placeholder={'Введите email'}
                            variant={'SMART_INPUT'}
                        />
                    }
                />

                <Button regularType={'submit'} buttonType={'SMART_WITH_ICON_BTN_FILLED'} isLoading={isFetching} ><CorrectIcon/>Сохранить</Button>

                <Typography className={cls.Error} size={'PARAGRAPH-12-REGULAR'}>{Error}</Typography>
            </form>
        </div>
    )
};
