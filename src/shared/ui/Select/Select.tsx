import { useState } from 'react';
import cls from './Select.module.scss';
import { classNames } from '@/shared/lib/classNames';
import DownArrow from '@/shared/assets/icons/smallDownArrow.svg';
import UserAvatarIcon from '@/shared/assets/icons/userAvatarIcon.svg';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import {ComboBoxOption, positionTypes} from "../ComboBox/ComboBox.tsx";

export const selectColorTypes = {
    'DEFAULT': cls['DefaultColor'],
    'PURPLE': cls['PurpleColor'],
} as const

export const widthTypes = {
    'FULL_WIDTH': cls['FullWidth'],
    'FIT_CONTENT': cls['FitContentWidth'],
} as const

interface SelectProps {
    className?: string;
    options: ComboBoxOption[];
    placeholder?: string;
    value: ComboBoxOption;
    onSelectFunc: (value: ComboBoxOption) => void;
    onSelectAction?: (value: ComboBoxOption) => void;
    position?: keyof typeof positionTypes;
    withImage?: boolean;
    colorType?: keyof typeof selectColorTypes;
    widthType?: keyof typeof widthTypes
}


export const Select = (props: SelectProps) => {
    const {className, options, placeholder = 'Выберите',
        value, onSelectFunc, onSelectAction, position = 'ABSOLUTE',
        withImage = false, colorType = 'DEFAULT', widthType = 'FULL_WIDTH'
    } = props

    const [open, setOpen] = useState(false);
    const selectRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

    const onSelect = (option: ComboBoxOption) => {
        onSelectFunc(option);
        onSelectAction?.(option);
        setOpen(false);
    };

    return (
        <div
            ref={selectRef}
            className={classNames(cls.Select, {}, [className, widthTypes[widthType]])}
        >
            <div
                className={classNames(cls.InputWrapper, {}, [selectColorTypes[colorType]])}
                onClick={() => setOpen(prev => !prev)}
            >
                {withImage && (
                    <div className={cls.AvatarWrapper}>
                        {value?.data?.image
                            ? <img className={cls.AvatarImage} alt="avatar" src={value.data.image} />
                            : <UserAvatarIcon />}
                    </div>
                )}
                <span className={cls.SelectedText}>
                    {value?.label || placeholder}
                </span>
                <span className={classNames(cls.IconWrapper, { [cls.ActiveInput]: open })}>
                    <DownArrow />
                </span>
            </div>

            {open && (
                <ul className={classNames(cls.OptionsList, {}, [positionTypes[position]])}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onMouseUp={() => onSelect(option)}
                            className={classNames(cls.OptionItem, { [cls.WithImageOptionItem]: withImage })}
                        >
                            {withImage ? (
                                <div className={cls.WithImageElement}>
                                    <div className={cls.ElementImage}>
                                        {option.data?.image
                                            ? <img className={cls.AvatarImage} src={option?.data?.image} alt="Avatar" />
                                            : <UserAvatarIcon />}
                                    </div>
                                    {option.label}
                                </div>
                            ) : (
                                option.label
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
