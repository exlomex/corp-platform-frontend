import {ReactElement, FC, useState, useEffect} from "react";
import cls from "./Calendar.module.scss";
import RightArrow from "@/shared/assets/icons/rightArrow.svg";
import LeftIcon from "@/shared/assets/icons/rightArrow.svg";
import {classNames} from "@/shared/lib/classNames";

interface CalendarProps {
    activeDate: Date | null;
    setActiveDate: (date: Date) => void;
    isDateResettable?: boolean;
    disablePast?: boolean;
    onDayClickAction?: () => void;
}

export const Calendar: FC<CalendarProps> = ({ activeDate, setActiveDate, isDateResettable, disablePast = false, onDayClickAction}) => {
    const [displayDate, setDisplayDate] = useState<Date>(activeDate ?? new Date());

    useEffect(() => {
        if (activeDate) {
            setDisplayDate(activeDate);
        }
    }, [activeDate]);

    const daysInMonth = (year: number, month: number): number =>
        new Date(year, month + 1, 0).getDate();

    const startDayOfMonth = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        1
    ).getDay();

    const handleDayClick = (day: number): void => {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
        newDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (disablePast && newDate < today) return;

        if (isDateResettable) {
            if (newDate?.getTime() === activeDate?.getTime()) {
                setActiveDate(null);
                return;
            }
        }

        onDayClickAction?.()
        setActiveDate(newDate);
    };

    const handlePrevMonth = (): void => {
        const newDisplayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1);
        setDisplayDate(newDisplayDate);
    };

    const handleNextMonth = (): void => {
        const newDisplayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1);
        setDisplayDate(newDisplayDate);
    };

    const renderDays = (): ReactElement[] => {
        const days: ReactElement[] = [];
        const totalDays = daysInMonth(displayDate.getFullYear(), displayDate.getMonth());

        for (let i = 0; i < startDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className={`${cls.calendarDay} ${cls.empty}`}></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
            date.setHours(0, 0, 0, 0);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const isPast = date < today;
            const isDisabled = disablePast && isPast;

            const isActive = !!activeDate &&
                activeDate.getDate() === day &&
                activeDate.getMonth() === displayDate.getMonth() &&
                activeDate.getFullYear() === displayDate.getFullYear();

            days.push(
                <div
                    key={day}
                    className={classNames(cls.calendarDay, {
                        [cls.active]: isActive,
                        [cls.disabled]: isDisabled,
                        [cls.pastDay]: disablePast && isPast,
                    })}
                    onClick={() => !isDisabled && handleDayClick(day)}
                >
                    {day}
                </div>
            );
        }


        return days;
    };

    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    return (
        <div className={cls.calendarContainer}>
            <div className={cls.calendarHeader}>
                <span>{`${displayDate.toLocaleString("default", { month: "long" })} ${displayDate.getFullYear()}`}</span>
                <div className={cls.Arrows}>
                    <span onClick={handlePrevMonth} className={cls.LeftIcon}><LeftIcon /></span>
                    <span onClick={handleNextMonth} className={cls.RightIcon}><RightArrow /></span>
                </div>
            </div>

            <div className={cls.calendarGridDays}>
                {daysOfWeek.map((day, index) => <p key={index}>{day}</p>)}
            </div>

            <div className={cls.calendarGrid}>{renderDays()}</div>
        </div>
    );
};

