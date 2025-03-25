import {classNames} from '@/shared/lib/classNames';
import cls from './LoginPage.module.scss';
import {Theme} from "@/shared/types/theme.ts";

interface LoginPageProps {
    className?: string;
}

export function LoginPage(props: LoginPageProps) {
    const { className } = props;


    return (
        <main className={classNames(cls.LoginPage, {}, [className, Theme.DARK_THEME])}>
            loginPage
        </main>
    )
}

export default LoginPage