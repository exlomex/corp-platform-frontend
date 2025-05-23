import { classNames } from '@/shared/lib/classNames';
import cls from './ExtraFiltersButton.module.scss';
import DownArrow from "@/shared/assets/icons/smallDownArrow.svg";

interface ExtraFiltersButtonProps {
    className?: string;
    isOpen?: boolean
}

export const ExtraFiltersButton = (props: ExtraFiltersButtonProps) => {
    const { className, isOpen } = props;
    return (
        <div className={classNames(cls.ExtraFiltersButton, {}, [className])}>
            <span>Показать больше</span>
            <span
                className={classNames(cls.IconWrapper, {[cls.ButtonIsActive]: isOpen}, [])}
            >
                    <DownArrow/>
                </span>
        </div>
    )
};
