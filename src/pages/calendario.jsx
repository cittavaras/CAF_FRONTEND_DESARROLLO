import React from "react";
import moment from "moment";
import { useState } from "react";


const styles = {
  calendar: {
    display: "flex",
    flexDirection: "row", 
    alignItems: "center",
    width: "100%",
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },

  navigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: "10px 0",

  },
  weekdays: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    marginBottom: "10px",
    flexDirection: "row", 
  },

  day: {
    width: "40px",  // ajustar el ancho a 40px
    height: "30px",  // mantener la altura en 30px
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    cursor: "pointer",
  },

  currentDay: {
    backgroundColor: "orange",
  },
};


const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment());

  const prevMonth = () => setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  const nextMonth = () => setCurrentMonth(currentMonth.clone().add(1, 'month'));

  const renderDays = () => {
    const days = [];
    const startOfMonth = currentMonth.clone().startOf('month').weekday(0);
    const endOfMonth = currentMonth.clone().endOf('month').weekday(6);
    let day = startOfMonth.clone();
    while (day.isSameOrBefore(endOfMonth, 'day')) {
      days.push(
        <div
          className={`day${selectedDay && selectedDay.isSame(day, 'day') ? ' selected' : ''}`}
          key={day.format('DDMMYYYY')}
          onClick={() => setSelectedDay(day)}
        >
          {day.format('D')}
        </div>
      );
      day.add(1, 'day');
    }
    return days;
  };

  return (
    <div className="calendar">
      <div className="navigation">
        <button onClick={prevMonth}>Prev</button>
        <h2>{currentMonth.format('MMMM YYYY')}</h2>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className="days">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
