import {classNames} from "@/shared/lib/classNames";
import {RegisterForm} from "@/features/Registration";
import cls from './RegisterPage.module.scss'
import {Theme} from "@/shared/types/theme.ts";

interface RegisterPageProps {
    className?: string;
}

export default function RegisterPage(props: RegisterPageProps) {
    const { className } = props;
    return (
        <main className={classNames(cls.RegisterPage, {}, [className, Theme.LIGHT_THEME])}>
            <RegisterForm/>
        </main>
    )
};
