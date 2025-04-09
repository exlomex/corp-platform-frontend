import { classNames } from '@/shared/lib/classNames';
import cls from './Spinner.module.scss';

const spinnerSizes = {
    'S_SIZE': cls['sSizeSpinner'],
    'M_SIZE': cls['mSizeSpinner'],
} as const

interface SpinnerProps {
    className?: string;
    size?: keyof typeof spinnerSizes
}

export const Spinner = (props: SpinnerProps) => {
    const { className, size = 'M_SIZE' } = props;
    return (
        <span className={classNames(cls.Spinner, {}, [className, spinnerSizes[size]])}></span>
    )
};
