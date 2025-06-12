import {classNames} from '@/shared/lib/classNames';
import cls from './LoginPage.module.scss';
import {Theme} from "@/shared/types/theme.ts";
import {LoginForm} from "@/features/Authorization";
import {Helmet} from "react-helmet";

interface LoginPageProps {
    className?: string;
}

export function LoginPage(props: LoginPageProps) {
    const { className } = props;


    return (
        <main className={classNames(cls.LoginPage, {}, [className, Theme.LIGHT_THEME])}>
            <Helmet>
                <title>{`Авторизация`}</title>
            </Helmet>

            <LoginForm/>
        </main>
    )
}

export default LoginPage