import { classNames } from '@/shared/lib/classNames';
import cls from './Input.module.scss';
import {InputHTMLAttributes, useState} from "react";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import OpenEye from '@/shared/assets/icons/openEye.svg';
import CloseEye from '@/shared/assets/icons/closeEye.svg';

export const InputTypes = {
    TYPE_TEXT: cls['TextInput'],
    TYPE_PASSWORD: cls['PasswordInput'],
} as const

export const InputVariant = {
    DEFAULT_INPUT: cls['DefaultInput'],
    SMART_INPUT: cls['SmartInput']
}

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'maxLength' | 'id'>

interface InputProps<T extends object> extends HtmlInputProps{
    className?: string;
    type?: keyof typeof InputTypes;
    register?: UseFormRegisterReturn<string>
    error?: FieldError | undefined;
    maxLength?: number;
    id?: keyof T;
    variant?: keyof typeof InputVariant;
}

export const Input = <T,>(props: InputProps<T>) => {
    const {
        className,
        type = 'TYPE_TEXT',
        error,
        register,
        maxLength = 30,
        id,
        placeholder,
        autoComplete,
        disabled,
        variant = 'DefaultInput'
    } = props;

    type inputTypes = Extract<InputHTMLAttributes<HTMLInputElement>["type"], 'password' | 'text'>
    const [inputType, setInputType] = useState<inputTypes>(type === 'TYPE_TEXT' ? 'text' : 'password')

    const onToggleInputType = () => {
        setInputType(prevState => prevState === 'text' ? prevState = 'password' : prevState = 'text')
    }

    const currentEyeIcon = inputType === 'password'
        ? <OpenEye onClick={onToggleInputType} className={cls.InputIcon}/>
        : <CloseEye onClick={onToggleInputType} className={cls.InputIcon}/>

    return (
        <div className={cls.InputWrapper}>
            <input
                disabled={disabled}
                className={classNames(cls.Input, {}, [className, InputTypes[type], InputVariant[variant]])}
                maxLength={maxLength}
                id={id}
                {...register}
                type={inputType}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
            {type === 'TYPE_PASSWORD' && currentEyeIcon}
        </div>
    )
};
