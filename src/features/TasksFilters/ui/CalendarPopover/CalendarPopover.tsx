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
    isDateResettable?: boolean
    fullWidth?: boolean;
    disablePast?: boolean
}

const CalendarInputButton = (props: {isOpen?: boolean, date: Date, fullWidth?: boolean}) => {
    const {isOpen, date, fullWidth = false} = props

    return (
        <div className={classNames(cls.CalendarInput, {[cls.FullWidth]: fullWidth}, [])}>{date && dateConverter(date)}</div>
    )
}

export const CalendarPopover = (props: CalendarPopoverProps) => {
    const { className, disablePast,direction = 'bottom', setActiveDate,activeDate, isDateResettable, fullWidth = false } = props;
    return (
        <Popover
            gap={6}
            direction={direction as AnchorProps}
            className={classNames(cls.CalendarPopover, {}, [className])}
            trigger={<CalendarInputButton date={activeDate} fullWidth={fullWidth}/>}
        >
            {() => (
                <Calendar disablePast={disablePast} activeDate={activeDate} setActiveDate={setActiveDate} isDateResettable={isDateResettable}/>
            )}

        </Popover>
    )
};
