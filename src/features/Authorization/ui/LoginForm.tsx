import { classNames } from '@/shared/lib/classNames';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>

        </div>
    )
};
