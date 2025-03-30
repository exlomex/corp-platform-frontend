import { classNames } from '@/shared/lib/classNames';
import cls from './Spinner.module.scss';

interface SpinnerProps {
    className?: string;
}

export const Spinner = (props: SpinnerProps) => {
    const { className } = props;
    return (
        <span className={classNames(cls.Spinner, {}, [className])}></span>
    )
};
