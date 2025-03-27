import { classNames } from '@/shared/lib/classNames';
import cls from './Input.module.scss';
import {ForwardedRef, forwardRef, InputHTMLAttributes, useState} from "react";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import OpenEye from '@/shared/assets/icons/openEye.svg';
import CloseEye from '@/shared/assets/icons/closeEye.svg';

export const InputTypes = {
    TYPE_TEXT: cls['TextInput'],
    TYPE_PASSWORD: cls['PasswordInput'],
} as const

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'maxLength'>

interface InputProps extends HtmlInputProps{
    className?: string;
    type?: keyof typeof InputTypes;
    register?: UseFormRegisterReturn<string>
    error?: FieldError | undefined;
    maxLength?: number;
}

export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
        className,
        type = 'TYPE_TEXT',
        error,
        register,
        maxLength = 24,
        id,
        placeholder
    } = props;

    type inputTypes = Extract<InputHTMLAttributes<HTMLInputElement>["type"], 'password' | 'text'>
    const [inputType, setInputType] = useState<inputTypes>('password')

    const onToggleInputType = () => {
        setInputType(prevState => prevState === 'text' ? prevState = 'password' : prevState = 'text')
    }

    const currentEyeIcon = inputType === 'password'
        ? <OpenEye onClick={onToggleInputType} className={cls.InputIcon}/>
        : <CloseEye onClick={onToggleInputType} className={cls.InputIcon}/>

    return (
        <div className={cls.InputWrapper}>
            <input
                className={classNames(cls.Input, {}, [className, InputTypes[type]])}
                maxLength={maxLength}
                id={id}
                ref={ref}
                {...register}
                type={inputType}
                placeholder={placeholder}
            />
            {type === 'TYPE_PASSWORD' && currentEyeIcon}
        </div>
    )
});
