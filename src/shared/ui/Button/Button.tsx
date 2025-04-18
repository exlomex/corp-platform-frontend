import cls from './Button.module.scss'
import {ButtonHTMLAttributes, memo, ReactNode} from "react";
import {classNames, Mods} from "@/shared/lib/classNames";
import {Spinner} from "@/shared/ui/Spinner";
import {Theme} from "@/shared/types/theme.ts";

type OmittedBtnType = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'type'>

export const ButtonTypes = {
    'TEXT_BTN_FILLED': cls['TextBtnFilled'],
    'ICON_BTN_FILLED': cls['IconBtnFilled'],
    'SMART_TEXT_BTN_FILLED': cls['SmartTextBtnFilled'],
    'SMART_ICON_BTN_FILLED': cls['SmartIconBtnFilled']
} as const

interface ButtonProps extends OmittedBtnType{
    className?: string,
    children?: ReactNode,
    onClick?: () => void,
    disabled?: boolean,
    fullWidth?: boolean;
    buttonType?: keyof typeof ButtonTypes;
    isLoading?: boolean;
    regularType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}
export const Button = memo((props: ButtonProps) => {
    const {className, children, onClick, disabled, fullWidth, buttonType = 'TEXT_BTN_FILLED', isLoading = false, regularType = 'button'} = props

    const BtnMods: Mods = {[cls['ButtonFullWidth']]: fullWidth, [cls['ButtonLoading']]: isLoading}

    return (
        <button
            className={classNames(cls.Button, BtnMods, [className, ButtonTypes[buttonType]])}
            onClick={onClick}
            disabled={disabled || isLoading}
            type={regularType as 'submit' | 'reset' | 'button' | undefined}
        >
            {isLoading && <span className={cls.Spinner}><Spinner/></span>}
            {children}
        </button>
    )
});