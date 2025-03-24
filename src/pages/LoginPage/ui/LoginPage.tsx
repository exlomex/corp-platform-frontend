import {classNames} from '@/shared/lib/classNames';
import cls from './LoginPage.module.scss';
import {useTheme} from "@/shared/hooks/useTheme";
import {Theme} from "@/shared/types/theme.ts";
import {useEffect, useRef} from "react";

interface LoginPageProps {
    className?: string;
}

export function LoginPage(props: LoginPageProps) {
    const { className } = props;


    return (
        <div className={classNames(cls.LoginPage, {}, [className])}>

        </div>
    )
}

export default LoginPage