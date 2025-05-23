import { classNames } from '@/shared/lib/classNames';
import cls from './CheckBoxFilter.module.scss';
import {Popover} from "@/shared/ui/popups";
import {FilterButton} from "@/features/TasksFilters/ui/FilterButton/FilterButton.tsx";
import {MultiSelect, Option} from "@/shared/ui/MultiSelect";
import {AnchorProps} from "@/shared/types/popups.ts";

interface CheckBoxFilterProps {
    className?: string;
    selectedValues: (string | number)[]
    setSelectedValues: (values: (string | number)[]) => void;
    placeholder: string
    options: Option[]
    direction?: AnchorProps
}

export const CheckBoxFilter = (props: CheckBoxFilterProps) => {
    const { className, selectedValues, placeholder, options, setSelectedValues, direction = 'bottom start' } = props;
    return (
        <Popover
            gap={6}
            direction={direction as AnchorProps}
            className={classNames(cls.CheckBoxFilter, {}, [className])}
            trigger={<FilterButton selectedValues={selectedValues} placeholder={placeholder} />}
        >
            {() => (
                <MultiSelect
                    options={options}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}/>
            )}

        </Popover>
    )
};
