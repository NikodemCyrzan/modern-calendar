import { ChangeEvent, useRef, useState } from "react";
import calendarIcon from "./calendar.svg";
import leftArrowIcon from "./left-arrow.svg";
import rightArrowIcon from "./right-arrow.svg";

type DropdownProps = {
    visible: boolean;
    date: { day: number; month: number; year: number };
    monthBack: () => void;
    monthForward: () => void;
    setDate: (date: { day: number; month: number; year: number }) => void;
};

const Dropdown = ({
    visible = false,
    date,
    monthBack,
    monthForward,
    setDate,
}: DropdownProps) => {
    const months = [
        "Stryczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień",
    ];

    date.day ||= 1;
    date.month ||= 1;
    date.year ||= 2020;

    let startingDay = new Date(date.year, date.month - 1, 1).getDay(),
        monthLength = new Date(date.year, date.month, 0).getDate();

    startingDay = startingDay === 0 ? 7 : startingDay;

    let header = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"].map((e) => (
        <span key={e}>{e}</span>
    ));
    let days = Array(monthLength + startingDay - 1)
        .fill(0)
        .map((_, i) =>
            i + 1 >= startingDay ? (
                <span
                    key={i}
                    onClick={() =>
                        setDate({
                            day: i + 2 - startingDay,
                            month: date.month,
                            year: date.year,
                        })
                    }
                    className={
                        i + 2 - startingDay === date.day ? "focused" : ""
                    }>
                    {i + 2 - startingDay}
                </span>
            ) : (
                <div key={i}></div>
            )
        );

    return (
        <div
            className="dropdown__container"
            style={{ visibility: visible ? "visible" : "hidden" }}>
            <div className="dropdown-header">
                <img src={leftArrowIcon} alt="left arrow" onClick={monthBack} />
                <b>
                    {months[date.month - 1]} {date.year}
                </b>
                <img
                    src={rightArrowIcon}
                    alt="right arrow"
                    onClick={monthForward}
                />
            </div>
            <div className="dropdown-grid">
                {header}
                {days}
            </div>
        </div>
    );
};

const Calendar = () => {
    const [date, setDate] = useState<{
        day: number;
        month: number;
        year: number;
    }>({ day: 0, month: 1, year: 2022 });
    const [isDropdownVisible, setDropdownVisibility] = useState(false);

    const inputEl = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        setTimeout(() => {
            if (inputEl.current !== document.activeElement)
                inputEl.current?.focus();
            if (!isDropdownVisible) setDropdownVisibility(true);
        }, 1);
    };

    const formatYear = (year: number): number =>
        Math.max(Math.min(year, 2030), 2020);
    const formatMonth = (month: number): number =>
        Math.max(Math.min(month, 12), 1);
    const formatDay = (day: number, year: number, month: number): number =>
        Math.max(Math.min(day, new Date(year, month, 0).getDate()), 1);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value),
            year = formatYear(date.getFullYear()),
            month = formatMonth(date.getMonth() + 1),
            day = formatDay(date.getDate(), year, month);

        handleSetDate({
            year,
            month,
            day,
        });
    };
    const handleMonthBack = () => {
        const month = formatMonth(date.month - 1 <= 0 ? 12 : date.month - 1),
            year = formatYear(date.month - 1 <= 0 ? date.year - 1 : date.year),
            day = formatDay(date.day, year, month);

        setDate({
            year,
            month,
            day,
        });
    };
    const handleMonthforward = () => {
        const month = formatMonth(date.month + 1 > 12 ? 1 : date.month + 1),
            year = formatYear(date.month + 1 > 12 ? date.year + 1 : date.year),
            day = formatDay(date.day, year, month);

        setDate({
            year,
            month,
            day,
        });
    };

    const handleSetDate = (date: {
        day: number;
        month: number;
        year: number;
    }) => {
        if (inputEl.current !== null)
            inputEl.current.value = `${date.year}-${
                date.month < 10 ? "0" + date.month : date.month
            }-${date.day < 10 ? "0" + date.day : date.day}`;
        setDate(date);
    };

    return (
        <div className="calendar">
            <div className="calendar__wrapper">
                <div className="calendar__container">
                    <div
                        onClick={handleClick}
                        className="calendar-input__container">
                        <span className="calendar-input__title">
                            Od kiedy wolne
                        </span>
                        <span>
                            <img src={calendarIcon} alt="calendar icon" />
                        </span>
                        <input
                            ref={inputEl}
                            type="date"
                            onInput={handleInputChange}></input>
                        <Dropdown
                            visible={isDropdownVisible}
                            date={date}
                            monthBack={handleMonthBack}
                            monthForward={handleMonthforward}
                            setDate={handleSetDate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
