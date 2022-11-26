import "./App.scss";
import calendarIcon from "./icons/calendar.svg";

function App() {
    return (
        <div className="calendar">
            <div className="calendar__wrapper">
                <div className="calendar__container">
                    <div className="calendar-input__container calendar-input__container--focused">
                        <span className="calendar-input__title">
                            Od kiedy wolne
                        </span>
                        <span>
                            <img src={calendarIcon} alt="calendar icon" />
                        </span>
                        <input type="date"></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
