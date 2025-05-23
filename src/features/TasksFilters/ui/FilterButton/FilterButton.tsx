import { classNames } from '@/shared/lib/classNames';
import cls from './FilterButton.module.scss';
import DownArrow from "@/shared/assets/icons/smallDownArrow.svg";

interface FilterButtonProps {
    className?: string;
    selectedValues: (string | number)[]
    placeholder: string
    isOpen?: boolean
}

export const FilterButton = (props: FilterButtonProps) => {
    const { className, placeholder, selectedValues, isOpen } = props;
    return (
        <div className={classNames(cls.FilterButton, {}, [className])}>
            <span>{placeholder}:</span>

            <div className={cls.RightBoxWrapper}>
                {
                    selectedValues.length >= 1 ?
                        (
                            <div className={cls.SelectedValuesCount}>{selectedValues.length}</div>
                        ) : 'Все'
                }

                <span
                    className={classNames(cls.IconWrapper, {[cls.ButtonIsActive]: isOpen}, [])}
                >
                    <DownArrow/>
                </span>
            </div>
        </div>
    )
};
