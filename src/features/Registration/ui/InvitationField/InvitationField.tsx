import { UseFormRegisterReturn} from "react-hook-form";
import {ForwardedRef, forwardRef, useEffect, useRef, useState} from "react";
import {Input} from "@/shared/ui/Input";
import {classNames} from "@/shared/lib/classNames";
import {Button} from "@/shared/ui/Button";
import cls from './InvitationField.module.scss'
import CorrectIcon from '@/shared/assets/icons/correctArrow.svg'
import CloseIcon from '@/shared/assets/icons/closeArrow.svg'
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {checkInvitationCode} from "../../model/services/checkInvitationCode.ts";
import {useSelector} from "react-redux";
import {
    getRegisterInvitationCodeIsActivate,
    getRegisterInvitationCodeIsError,
    getRegisterInvitationCodeIsFeching
} from "../../model/selectors/getRegisterValues.ts";
import {RegistrationSliceActions} from "@/features/Registration";
import {CheckInvitationCodeReturnedData} from "../../model/types/CheckInvitationCodeTypes.ts";

interface InvitationFieldProps<T> {
    className?: string;
    register: UseFormRegisterReturn<string>
    maxLength?: number;
    id: keyof T;
    value: string | undefined;
    resetInvitationCodeAndEmailValuesFields: () => void;
    setEmailValue: (value: string) => void
}

export const InvitationField = <T,>(props: InvitationFieldProps<T>) => {
    const {
        className,
        register,
        maxLength = 24,
        id,
        value,
        resetInvitationCodeAndEmailValuesFields,
        setEmailValue
    } = props;

    const dispatch = useAppDispatch()

    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const isCodeActivate = useSelector(getRegisterInvitationCodeIsActivate)
    const InvitationCodeIsFetching = useSelector(getRegisterInvitationCodeIsFeching)
    const InvitationCodeIsError = useSelector(getRegisterInvitationCodeIsError)

    useEffect(() => {
        if (isCodeActivate) {
            setSuccess('Код приглашения активирован')
        }
        if (InvitationCodeIsError) {
            setError('Введите корректный код приглашения ')
        }
    }, [isCodeActivate, InvitationCodeIsError]);

    const inputRef = useRef(null)

    useEffect(() => {
        console.log(inputRef.current);
    }, []);

    const onInvitationCheckButtonClickHandler = async () => {
        if (error) setError('');

        if (value === undefined || value === '') {
            setError('Поле должно быть заполнено')
            return
        }

        try {
            const data: CheckInvitationCodeReturnedData = await dispatch(checkInvitationCode({code: value})).unwrap()
            setEmailValue(data.email)
        } catch (e) {
            console.error(e)
        }
    }

    const onInvitationCloseButtonClickHandler = () => {
        setSuccess('')

        dispatch(RegistrationSliceActions.setInvitationCodeIsActivate(false))
        resetInvitationCodeAndEmailValuesFields()
    }

    return (
        <div className={classNames(cls.InvitationField, {}, [className])}>
            <label htmlFor={String(id)} className={cls.InputLabel}>Код приглашения</label>
            <div className={cls.InputWrapper}>
                <Input disabled={isCodeActivate} placeholder={'Введите свой код приглашения'} maxLength={45} id={String(id)} register={register}/>
                {
                    !isCodeActivate
                        ? (<Button
                            isLoading={InvitationCodeIsFetching}
                            buttonType={'ICON_BTN_FILLED'}
                            onClick={onInvitationCheckButtonClickHandler}
                        >
                            <CorrectIcon/>
                        </Button>)
                        : (<Button
                            regularType={'button'}
                            isLoading={InvitationCodeIsFetching}
                            buttonType={'ICON_BTN_FILLED'}
                            onClick={onInvitationCloseButtonClickHandler}
                        >
                            <CloseIcon/>
                        </Button>)
                }
            </div>
            {error && <span className={classNames(cls.InputMessage, {}, [cls.MessageError])}>{error}</span>}
            {success && <span className={classNames(cls.InputMessage, {}, [cls.MessageSuccess])}>{success}</span>}
        </div>
    )
};