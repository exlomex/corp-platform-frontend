import { classNames } from '@/shared/lib/classNames';
import cls from './PasswordRecoveryContent.module.scss';
import {ReactElement} from "react";
import {useSelector} from "react-redux";
import {getPasswordRecoveryStepCount} from "../../model/selectors/getPasswordRecoveryValues.ts";
import {SendVerificationCodeForm} from "../SendVerificationCodeForm/SendVerificationCodeForm.tsx";
import {
    CheckVerificationCodeForm
} from "@/features/PasswordRecovery/ui/CheckVerificationCodeForm/CheckVerificationCodeForm.tsx";
import {EnterNewPasswordForm} from "@/features/PasswordRecovery/ui/EnterNewPasswordForm/EnterNewPasswordForm.tsx";

interface PasswordRecoveryContentProps {
    className?: string;
}

export const PasswordRecoveryContent = (props: PasswordRecoveryContentProps) => {
    const { className } = props;

    const stepCount = useSelector(getPasswordRecoveryStepCount)

    const PasswordRecoveryActiveContent = (): ReactElement => {
        switch (stepCount) {
            case 1:
                return <SendVerificationCodeForm/>
            case 2:
                return <CheckVerificationCodeForm/>
            case 3:
                return <EnterNewPasswordForm/>
        }
    };

    return (
        <div className={classNames(cls.PasswordRecoveryContent, {}, [className])}>
            <PasswordRecoveryActiveContent/>
        </div>
    )
};
