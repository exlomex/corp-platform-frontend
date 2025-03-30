import {UseFormRegisterReturn} from "react-hook-form";
import {ForwardedRef, forwardRef, useEffect, useState} from "react";
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
    getRegisterInvitationCodeIsError,
    getRegisterInvitationCodeIsFeching
} from "../../model/selectors/getRegisterValues.ts";

interface InvitationFieldProps<T extends object> {
    className?: string;
    register: UseFormRegisterReturn<string>
    maxLength?: number;
    id: keyof T;
    value: string | undefined;
    resetInvitationCodeAndEmailValuesFields: () => void
}

export const InvitationField = forwardRef(<T,>(props: InvitationFieldProps<T>, emailFieldRef: ForwardedRef<HTMLInputElement>) => {
    const {
        className,
        register,
        maxLength = 24,
        id,
        value,
        resetInvitationCodeAndEmailValuesFields
    } = props;

    const dispatch = useAppDispatch()

    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    useEffect(() => {
        if (value !== undefined & value !== '') {
            setError('')
        }
        if (success) {
            setSuccess('')
        }
    }, [value]);

    const InvitationCodeIsFetching = useSelector(getRegisterInvitationCodeIsFeching)
    const InvitationCodeIsError = useSelector(getRegisterInvitationCodeIsError)

    const onInvitationCheckButtonClickHandler = async () => {
        if (value === undefined || value === '') {
            setError('Поле должно быть заполнено')
            return
        }

        try {
            await dispatch(checkInvitationCode({code: value})).unwrap()

            setSuccess('Код приглашения активирован')
        } catch (e) {
            console.log(InvitationCodeIsError);
            setError('Введите корректный код приглашения ')
        }
    }

    const onInvitationCloseButtonClickHandler = () => {
        setSuccess('')
        resetInvitationCodeAndEmailValuesFields()
    }

    return (
        <div className={classNames(cls.InvitationField, {}, [className])}>
            <label htmlFor={id} className={cls.InputLabel}>Код приглашения</label>
            <div className={cls.InputWrapper}>
                <Input disabled={!!success} placeholder={'Введите свой код приглашения'} maxLength={45} id={id} register={register}/>
                {
                    !success
                        ? (<Button
                            isLoading={InvitationCodeIsFetching}
                            buttonType={'ICON_BTN_FILLED'}
                            onClick={onInvitationCheckButtonClickHandler}
                        >
                            <CorrectIcon/>
                        </Button>)
                        : (<Button
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
});