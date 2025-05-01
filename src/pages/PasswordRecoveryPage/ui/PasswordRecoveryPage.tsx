import { classNames } from '@/shared/lib/classNames';
import cls from './PasswordRecoveryPage.module.scss';
import {PasswordRecoveryContent} from "@/features/PasswordRecovery";
import {Theme} from "@/shared/types/theme.ts";

interface PasswordRecoveryProps {
    className?: string;
}

export function PasswordRecoveryPage(props: PasswordRecoveryProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.PasswordRecovery, {}, [className, Theme.LIGHT_THEME])}>
            <PasswordRecoveryContent/>
        </div>
    )
}

export default PasswordRecoveryPage;