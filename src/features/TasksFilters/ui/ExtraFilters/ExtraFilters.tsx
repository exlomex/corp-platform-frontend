import { classNames } from '@/shared/lib/classNames';
import cls from './ExtraFilters.module.scss';
import {AnchorProps} from "@/shared/types/popups.ts";
import {Popover} from "@/shared/ui/popups";
import {ExtraFiltersButton} from "../ExtraFiltersButton/ExtraFiltersButton.tsx";
import {MultiSelect, Option} from "@/shared/ui/MultiSelect";
import {CheckBoxFilter} from "@/features/TasksFilters/ui/CheckBoxFilter/CheckBoxFilter.tsx";
import {CalendarPopover} from "@/features/TasksFilters/ui/CalendarPopover/CalendarPopover.tsx";
import {ChangeEvent} from "react";

interface ExtraFiltersProps {
    className?: string;
    direction?: AnchorProps

    // author
    authorOptions: Option[]
    authorSelectedValues: (string | number)[]
    authorSetSelectedValues: (values: (string | number)[]) => void

    // priority
    priorityOptions: Option[]
    prioritySelectedValues: (string | number)[]
    prioritySetSelectedValues: (values: (string | number)[]) => void

    // deadline
    deadlineFrom: Date
    setDeadlineFrom: (date: Date) => void

    deadlineTo: Date
    setDeadlineTo: (date: Date) => void

    // story points
    storyPointsFrom: string
    setStoryPointsFrom: (number: string) => void

    storyPointsTo: string
    setStoryPointsTo: (number: string) => void
}

export const ExtraFilters = (props: ExtraFiltersProps) => {
    const { className, direction = 'bottom start',
        authorSetSelectedValues, authorSelectedValues, authorOptions,
        prioritySetSelectedValues, priorityOptions, prioritySelectedValues,
        deadlineTo, setDeadlineTo,
        deadlineFrom, setDeadlineFrom,
        setStoryPointsFrom, setStoryPointsTo,storyPointsFrom, storyPointsTo
    } = props;
    return (
        <Popover
            gap={6}
            direction={direction as AnchorProps}
            className={classNames(cls.ExtraFilters, {}, [className])}
            trigger={<ExtraFiltersButton />}
        >

            {() => (
                <div className={cls.ExtraFiltersContent}>
                    <CheckBoxFilter
                        selectedValues={authorSelectedValues}
                        setSelectedValues={authorSetSelectedValues}
                        placeholder={'Автор'}
                        options={authorOptions}
                    />

                    <CheckBoxFilter
                        selectedValues={prioritySelectedValues}
                        setSelectedValues={prioritySetSelectedValues}
                        placeholder={'Приоритет'}
                        options={priorityOptions}
                    />

                    <div className={cls.FilterWrapper}>
                        <span className={cls.FilterTitle}>Дедлайн</span>
                        <div className={cls.FiltersBottomLine}>
                            <span>От</span>
                            <CalendarPopover activeDate={deadlineFrom} setActiveDate={setDeadlineFrom}/>
                            <span>До</span>
                            <CalendarPopover direction={'bottom end'} activeDate={deadlineTo} setActiveDate={setDeadlineTo}/>
                        </div>
                    </div>

                    <div className={cls.FilterWrapper}>
                        <span className={cls.FilterTitle}>StoryPoints</span>
                        <div className={cls.FiltersBottomLine}>
                            <span>От</span>
                            <input value={storyPointsFrom} onChange={(e: ChangeEvent<HTMLInputElement>) => setStoryPointsFrom(e.target.value)} className={cls.NumberInput} type="number"/>
                            <span>До</span>
                            <input value={storyPointsTo} onChange={(e: ChangeEvent<HTMLInputElement>) => setStoryPointsTo(e.target.value)} className={cls.NumberInput} type="number"/>
                        </div>
                    </div>
                </div>
            )}
        </Popover>
    )
};
