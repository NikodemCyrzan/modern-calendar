import { useEffect, useRef, useState } from "react";
import calendarIcon from "./calendar.svg";
import leftArrowIcon from "./left-arrow.svg";
import rightArrowIcon from "./right-arrow.svg";

const Dropdown = ({
    visible = false,
    date,
}: {
    visible: boolean;
    date: number;
}) => {
    return (
        <div
            className="dropdown__container"
            style={{ visibility: visible ? "visible" : "hidden" }}>
            <div className="dropdown-header">
                <img src={leftArrowIcon} alt="left arrow" />
                <b>Maj 2022</b>
                <img src={rightArrowIcon} alt="right arrow" />
            </div>
            <div className="dropdown-grid">
                <span>Pn</span>
                <span>Wt</span>
                <span>Śr</span>
                <span>Cz</span>
                <span>Pt</span>
                <span>Sb</span>
                <span>Nd</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
                <span>15</span>
                <span>16</span>
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
                <span>22</span>
                <span>23</span>
                <span>24</span>
                <span>25</span>
                <span>26</span>
                <span>27</span>
                <span>28</span>
                <span>29</span>
                <span>30</span>
                <span>31</span>
            </div>
        </div>
    );
};

const Calendar = () => {
    const [date, setDate] = useState<number>(0);
    const [dropdownVisible, setDropdownVisibility] = useState(false);

    const inputEl = useRef<HTMLInputElement>(null),
        calendarContainerEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("Focus set");
        inputEl.current?.addEventListener("change", () => {
            setDate(Date.parse(inputEl.current?.value ?? "2022-01-01"));
            console.log(Date.parse(inputEl.current?.value ?? "2022-01-01"));
        });

        calendarContainerEl.current?.addEventListener("click", () => {
            console.log("Focus click");
            inputEl.current?.focus();
            setDropdownVisibility(true);
        });
    }, []);

    return (
        <div className="calendar">
            <div className="calendar__wrapper">
                <div className="calendar__container">
                    <div
                        ref={calendarContainerEl}
                        className="calendar-input__container">
                        <span className="calendar-input__title">
                            Od kiedy wolne
                        </span>
                        <span>
                            <img src={calendarIcon} alt="calendar icon" />
                        </span>
                        <input ref={inputEl} type="date"></input>
                        <Dropdown visible={dropdownVisible} date={date} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
