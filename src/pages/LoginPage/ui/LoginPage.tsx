import {classNames} from '@/shared/lib/classNames';
import cls from './LoginPage.module.scss';
import {Theme} from "@/shared/types/theme.ts";
import {Input} from "@/shared/ui/Input";
import {Typography} from "@/shared/ui/Typography";
import {Button} from "@/shared/ui/Button";

interface LoginPageProps {
    className?: string;
}

export function LoginPage(props: LoginPageProps) {
    const { className } = props;


    return (
        <main className={classNames(cls.LoginPage, {}, [className, Theme.LIGHT_THEME])}>
            loginPage
            <Input
                type={"TYPE_PASSWORD"}
                placeholder={'3131'}
            />
            <Typography size={'PARAGRAPH-16-REGULAR'}>
                fdfgdfggdgdgdgd
            </Typography>

            <Button fullWidth>Зарегистрироваться</Button>
        </main>
    )
}

export default LoginPage