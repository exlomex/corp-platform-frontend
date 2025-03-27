import cls from './Button.module.scss'
import {ButtonHTMLAttributes, ReactNode} from "react";
import {classNames} from "@/shared/lib/classNames";

type OmittedBtnType = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'>

interface ButtonProps extends OmittedBtnType{
    className?: string,
    children?: ReactNode,
    onClick?: () => void,
    disabled?: boolean,
    fullWidth?: boolean;
}
export const Button = (props: ButtonProps) => {
    const {className, children, onClick, disabled, fullWidth} = props

    return (
        <button
            className={classNames(cls.Button, {[cls['ButtonFullWidth']]: fullWidth}, [className])}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}