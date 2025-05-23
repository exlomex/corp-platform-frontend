import { ReactElement, FC } from "react";
import cls from "./Calendar.module.scss";
import RightArrow from "@/shared/assets/icons/rightArrow.svg";
import LeftIcon from "@/shared/assets/icons/rightArrow.svg";

interface CalendarProps {
    activeDate: Date | null;
    setActiveDate: (date: Date) => void;
}

export const Calendar: FC<CalendarProps> = ({ activeDate, setActiveDate }) => {
    const currentDate = new Date();
    const displayDate = activeDate ?? currentDate;

    const daysInMonth = (year: number, month: number): number =>
        new Date(year, month + 1, 0).getDate();

    const startDayOfMonth = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        1
    ).getDay();

    const handleDayClick = (day: number): void => {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
        setActiveDate(newDate);
    };

    const handlePrevMonth = (): void => {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1);
        setActiveDate(newDate);
    };

    const handleNextMonth = (): void => {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1);
        setActiveDate(newDate);
    };

    const renderDays = (): ReactElement[] => {
        const days: ReactElement[] = [];
        const totalDays = daysInMonth(displayDate.getFullYear(), displayDate.getMonth());

        for (let i = 0; i < startDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className={`${cls.calendarDay} ${cls.empty}`}></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const isActive = !!activeDate &&
                activeDate.getDate() === day &&
                activeDate.getMonth() === displayDate.getMonth() &&
                activeDate.getFullYear() === displayDate.getFullYear();

            days.push(
                <div
                    key={day}
                    className={`${cls.calendarDay} ${isActive ? cls.active : ""}`}
                    onClick={() => handleDayClick(day)}
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

