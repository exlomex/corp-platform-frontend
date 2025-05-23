import { classNames } from '@/shared/lib/classNames';
import cls from './CalendarPopover.module.scss';
import {AnchorProps} from "@/shared/types/popups.ts";
import {Popover} from "@/shared/ui/popups";
import {Calendar} from "@/shared/ui/Calendar";
import {dateConverter} from "@/features/TasksFilters/lib/DateConverter.ts";

interface CalendarPopoverProps {
    className?: string;
    direction?: AnchorProps
    activeDate: Date
    setActiveDate: (date: Date) => void
}

const CalendarInputButton = (props: {isOpen?: boolean, date: Date}) => {
    const {isOpen, date} = props

    return (
        <div className={cls.CalendarInput}>{date && dateConverter(date)}</div>
    )
}

export const CalendarPopover = (props: CalendarPopoverProps) => {
    const { className, direction = 'bottom', setActiveDate,activeDate } = props;
    return (
        <Popover
            gap={6}
            direction={direction as AnchorProps}
            className={classNames(cls.CalendarPopover, {}, [className])}
            trigger={<CalendarInputButton date={activeDate}/>}
        >
            {() => (
                <Calendar activeDate={activeDate} setActiveDate={setActiveDate}/>
            )}

        </Popover>
    )
};
