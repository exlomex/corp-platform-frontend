import { classNames } from '@/shared/lib/classNames';
import cls from './InputWrapper.module.scss';
import {ReactElement} from "react";
import {FieldError} from "react-hook-form";

export const labelSizes = {
    'S_SIZE': cls["LabelSmallSize"],
    'M_SIZE': cls["LabelMediumSize"],
} as const;

export const labelMessageColors = {
    'RED': cls["LabelMessageRedColor"],
    'GREEN': cls["LabelMessageGreenColor"],
} as const;

export const MessageSizes = {
    'SMALL_SIZE': cls['MessageSmallSize'],
    'MEDIUM_SIZE': cls['MessageMediumSize'],
}

interface InputWrapperProps<T> {
    className?: string;
    labelString?: string;
    labelFor?: keyof T;
    labelSize?: keyof typeof labelSizes;
    input: ReactElement;
    message?: FieldError | string;
    messageColor?: keyof typeof labelMessageColors;
    required?: boolean;
    messageSize?: keyof typeof MessageSizes;
}

export const InputWrapper = <T,>(props: InputWrapperProps<T>) => {
    const { className, input, message, labelFor, labelString, labelSize = 'M_SIZE', messageColor = 'RED', required=false, messageSize = 'MEDIUM_SIZE' } = props;
    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {labelString && <label
                className={classNames(cls.InputLabel, {}, [labelSizes[labelSize]])}
                htmlFor={labelFor}
            >
                {labelString}
                {required && <span className={cls.LabelRequired}>*</span>}
            </label>}

            {input}

            <div
                className={classNames(cls.InputWrapperError, {}, [labelMessageColors[messageColor], MessageSizes[messageSize]])}>{message && typeof message !== "string" ? message?.message : message}</div>
        </div>
    )
};
