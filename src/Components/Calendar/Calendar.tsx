import { ChangeEvent, useRef, useState } from "react";
import calendarIcon from "./calendar.svg";
import leftArrowIcon from "./left-arrow.svg";
import rightArrowIcon from "./right-arrow.svg";

type DropdownProps = {
    visible: boolean;
    // dla samego date można stworzyć osobny interface np. w /src/components/Calendar/types.ts
    date: { day: number; month: number; year: number };
    monthBack: () => void;
    monthForward: () => void;
    setDate: (date: { day: number; month: number; year: number }) => void;
};
// nie zmieniajace sie zmienne lepiej umieszczac nad komponent badz w osobnym pliku
const months = [
    "Styczeń",
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

const Dropdown = ({
    visible = false,
    date,
    monthBack,
    monthForward,
    setDate,
}: DropdownProps) => {


    const { day, month, year } = date || { day: 0, month: 1, year: 2020 }

    // to mozna zamknac w funkcji / dwoch funkcjach 
    let startingDay = new Date(year, month - 1, 1).getDay(),
        monthLength = new Date(year, month, 0).getDate();

    startingDay = startingDay === 0 ? 7 : startingDay;

    // ta tablice także można umieścić wyzej albo w osobnym pliku + samo header można umieścić jako osobny komponent
    let header = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"].map((e) => (
        <span key={e}>{e}</span>
    ));
    // samo Array().fill powinno byc jako osobna zmienna a wywołanie jej można wrzucić do osbnego komponentu
    let days = Array(monthLength + startingDay - 1)
        .fill(0)
        .map((_, i) =>
            i + 1 >= startingDay ? (
                <span
                    key={i}
                    onClick={() =>
                        setDate({
                            day: i + 2 - startingDay,
                            month,
                            year,
                        })
                    }
                    className={
                        i + 2 - startingDay === day ? "focused" : ""
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

    // te wszystkie funkcje można wrzucić w osobny plik
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
            // to tez mozna wrzucić w osobna funkcje ktora przyjmuje date i oddaje date
        const month = formatMonth(date.month - 1 <= 0 ? 12 : date.month - 1),
            year = formatYear(date.month - 1 <= 0 ? date.year - 1 : date.year),
            day = formatDay(date.day, year, month);

        setDate({
            year,
            month,
            day,
        });
    };
    const handleMonthForward = () => {
        // tu tez mozna w osobna
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
                            monthForward={handleMonthForward}
                            setDate={handleSetDate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
