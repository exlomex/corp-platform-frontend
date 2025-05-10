import {useState, useMemo, ChangeEvent, useRef, Dispatch, SetStateAction, useEffect} from 'react';
import cls from './ComboBox.module.scss';
import { classNames } from '@/shared/lib/classNames';
import DownArrow from '@/shared/assets/icons/smallDownArrow.svg'
import {useClickOutside} from "@/shared/hooks/useClickOutside";
import UserAvatarIcon from '@/shared/assets/icons/userAvatarIcon.svg'

export interface ComboBoxOption {
    id?: number
    label: string;
    value: string;
    data?: {
        [key: string]: string
    };
}

export const positionTypes = {
    'RELATIVE': cls['positionRelative'],
    'ABSOLUTE': cls['positionAbsolute'],
} as const

interface BaseProps {
    className?: string;
    options: ComboBoxOption[];
    placeholder?: string;
    onSelectAction?: (value: ComboBoxOption) => void;
    position?: keyof typeof positionTypes;
    withImage?: boolean
}

interface ControlledComboBoxProps extends BaseProps {
    setStateFunc: Dispatch<SetStateAction<ComboBoxOption>>;
    value: ComboBoxOption;
}

interface UncontrolledComboBoxProps extends BaseProps {
    setStateFunc?: Dispatch<SetStateAction<ComboBoxOption>>;
}

type ComboBoxProps = ControlledComboBoxProps | UncontrolledComboBoxProps;

export const ComboBox = (props: ComboBoxProps) => {
    const {
        className,
        options,
        placeholder = 'Выберите...',
        onSelectAction,
        position = 'ABSOLUTE',
        withImage = false,
        setStateFunc
    } = props;

    const value = 'value' in props ? props.value : undefined;

    const [query, setQuery] = useState(value?.label || '');
    const [selectedImage, setSelectedImage] = useState<string>('')
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        if (value?.data?.image) {
            setSelectedImage(value?.data?.image)
        }
    }, [value]);

    useEffect(() => {
        if (value?.label !== undefined) {
            setQuery(value.label);
        }
    }, [value]);

    const filteredOptions = useMemo(() => {
        const specialOption = options.find(opt => opt.value === '');
        const otherOptions = options.filter(
            (opt) => opt.value !== '' && opt.label.toLowerCase().includes(query.toLowerCase())
        );
        return specialOption ? [specialOption, ...otherOptions] : otherOptions;
    }, [query, options]);

    const handleSelect = (option: ComboBoxOption) => {
        setQuery(option.label);
        setShowOptions(false);
        onSelectAction?.(option);
        setStateFunc?.(option)

        if (withImage) {
            const image = option?.data?.image;
            if (image) setSelectedImage(image);
        }
    };

    const inputRef = useClickOutside<HTMLInputElement>(() => setShowOptions(false))
    const iconRef = useRef<HTMLSpanElement>(null)

    const onInputWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (iconRef.current?.contains(e.target as Node)) return;

        if (inputRef?.current) {
            if (showOptions) {
                inputRef?.current?.blur()
                setShowOptions(false)
            } else {
                inputRef?.current?.focus()
                const length = inputRef?.current?.value?.length;
                inputRef?.current.setSelectionRange(0, length)
                setShowOptions(true)
            }

        }
    }

    return (
        <div className={classNames(cls.ComboBox, {}, [className])}>
            <div
                className={cls.InputWrapper}
                onClick={onInputWrapperClick}
            >
                {withImage && <div className={cls.AvatarWrapper}>{selectedImage ? <img className={cls.AvatarImage} alt={'userAvatar'} src={selectedImage}/> : <UserAvatarIcon/>}</div>}

                <input
                    ref={inputRef}
                    type="text"
                    value={query as string}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setQuery(e?.target?.value);
                        setSelectedImage('')
                    }}
                    placeholder={placeholder}
                    className={classNames(cls.input, {[cls.WithImage]: withImage}, [])}
                />

                <span
                    ref={iconRef}
                    onClick={onInputWrapperClick}
                    className={classNames(cls.IconWrapper, {[cls.ActiveInput]: showOptions}, [])}><DownArrow/></span>
            </div>
            {showOptions && filteredOptions.length > 0 && (
                <ul className={classNames(cls.optionsList, {}, [positionTypes[position]])}>
                    {filteredOptions.map((option) => (
                        <li
                            key={option.value}
                            onMouseDown={() => handleSelect(option)}
                            className={classNames(cls.optionItem, {[cls.WithImageOptionItem]: withImage}, [])}
                        >
                            {withImage
                                ? <div className={cls.WithImageElement}>
                                    <div className={cls.ElementImage}>{option?.data?.image
                                        ? <img className={cls.AvatarImage} src={option?.data?.image} alt="Avatar"/>
                                        : <UserAvatarIcon/>}
                                    </div>
                                    {option.label}
                                </div>
                                : <>
                                    {option.label}
                                </>
                            }

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
