import { classNames } from '@/shared/lib/classNames';
import cls from './InputWrapper.module.scss';
import {ReactElement} from "react";
import {FieldError} from "react-hook-form";

export const labelSizes = {
    'S_SIZE': cls["LabelSmallSize"],
    'M_SIZE': cls["LabelMediumSize"],
} as const;

interface InputWrapperProps<T> {
    className?: string;
    labelString: string;
    labelFor?: keyof T;
    labelSize?: keyof typeof labelSizes;
    input: ReactElement;
    error?: FieldError;
}

export const InputWrapper = <T,>(props: InputWrapperProps<T>) => {
    const { className, input, error, labelFor, labelString, labelSize = 'M_SIZE' } = props;
    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            <label className={classNames(cls.InputLabel, {}, [labelSizes[labelSize]])} htmlFor={labelFor}>{labelString}</label>
            {input}
            {error && <span className={cls.InputWrapperError}>{error?.message}</span>}
        </div>
    )
};
