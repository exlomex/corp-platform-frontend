import { classNames } from '@/shared/lib/classNames';
import cls from './PasswordRecoveryPage.module.scss';
import {PasswordRecoveryContent} from "@/features/PasswordRecovery";
import {Theme} from "@/shared/types/theme.ts";
import {Helmet} from "react-helmet";

interface PasswordRecoveryProps {
    className?: string;
}

export function PasswordRecoveryPage(props: PasswordRecoveryProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.PasswordRecovery, {}, [className, Theme.LIGHT_THEME])}>
            <Helmet>
                <title>{`Восстановление пароля`}</title>
            </Helmet>

            <PasswordRecoveryContent/>
        </div>
    )
}

export default PasswordRecoveryPage;