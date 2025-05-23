import { classNames } from '@/shared/lib/classNames';
import cls from './MultiSelect.module.scss';
import {ReactNode, useMemo, useState} from "react";
import {Checkbox} from "@headlessui/react";
import SearchIcon from '@/shared/assets/icons/searchIcon.svg'
import CorrectIcon from '@/shared/assets/icons/extraSmallCorrectIcon.svg'

export interface Option<T = string> {
    label: ReactNode;
    value: string | number | T;
}

interface MultiSelectProps<T> {
    className?: string;
    options: Option<T>[];
    selectedValues: (string | number)[];
    setSelectedValues: (values: (string | number)[]) => void;
}

export const MultiSelect = <T extends (string | number)>(props: MultiSelectProps<T>) => {
    const { className, options, setSelectedValues, selectedValues } = props;

    const [search, setSearch] = useState('');

    const filteredOptions = useMemo(() => {
        return options.filter(option =>
            option.label?.toString().toLowerCase().includes(search.toLowerCase())
        );
    }, [search, options]);

    const toggleValue = (value: string | number) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(v => v !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    const clearAll = () => {
        setSearch('')
        setSelectedValues([])
    };

    return (
        <div className={classNames(cls.MultiSelect, {}, [className])}>
            <div className={cls.SearchWrapper}>
                <span className={cls.SearchIcon}><SearchIcon/></span>

                <input
                    type="text"
                    placeholder="Содержит текст"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className={cls.SearchInput}
                />
            </div>

            <div className={cls.SelectOptions}>
                {filteredOptions.length >= 1 ? (
                    filteredOptions.map(({label, value}) => {
                        const isChecked = selectedValues.includes(value);
                        return (
                            <label
                                onClick={() => toggleValue(value)} key={String(value)}
                                className={classNames(cls.SelectItem, {[cls.ActiveSelectItem]: isChecked}, [])}
                            >
                                <Checkbox
                                    checked={isChecked}
                                    className={classNames(cls.Checkbox, {[cls.ActiveCheckbox]: isChecked}, [])}
                                >
                                    {isChecked && <CorrectIcon/>}
                                </Checkbox>
                                <span>{label}</span>
                            </label>
                        );
                    })
                ): (<span className={cls.Empty}>Не найдено</span>)}
            </div>

            {selectedValues.length >= 1 && (
                <div className={cls.BottomLine}>
                    <button onClick={clearAll} className={cls.ClearButton}>
                        Очистить
                    </button>
                </div>
            )}
        </div>
    )
};
