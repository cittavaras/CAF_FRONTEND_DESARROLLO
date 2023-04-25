import React, { useState } from "react";

const wrapStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  overflow: "hidden",
};

const calendarContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  backgroundColor: "#f0f0f0",
};

const monthContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "1rem",
  overflowX: "scroll",
  whiteSpace: "nowrap",
};

const monthStyle = {
  display: "inline-block",
  padding: "0.5rem",
  textAlign: "center",
  backgroundColor: "#ffffff",
  margin: "0 3px",
  borderRadius: "4px",
};

const monthHoverStyle = {
  ...monthStyle,
  backgroundColor: "#eeeeee",
};

const selectedMonthStyle = {
  ...monthStyle,
  backgroundColor: "#C0D437",
};

const currentMonthStyle = {
  ...monthStyle,
  backgroundColor: "#C0D437",
};

const daysContainerStyle = {
  display: "flex",
  justifyContent: "center",
  overflowX: "scroll",
  whiteSpace: "nowrap",
};

const dayStyle = {
  display: "inline-block",
  padding: "1rem",
  textAlign: "center",
  backgroundColor: "#ffffff",
  margin: "0 3px",
  borderRadius: "4px",
};

const dayHoverStyle = {
  ...dayStyle,
  backgroundColor: "#eeeeee",
};

const selectedDayStyle = {
  ...dayStyle,
  backgroundColor: "#77d3ef",
};

const currentDayStyle = {
  ...dayStyle,
  backgroundColor: "#C0D437",
};


const Calendariocm = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(-1);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);

  const handleMouseEnter = (index) => {
    setHoveredDay(index);
  };

  const handleMouseLeave = () => {
    setHoveredDay(-1);
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [selectedDay, setSelectedDay] = useState(null);

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const getWeekDay = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return weekDays[date.getDay()];
  };

  const handleMonthClick = (monthIndex) => {
  setSelectedMonth(monthIndex);
  setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), monthIndex));
};

return (
  <div style={wrapStyle}>
    <div style={calendarContainerStyle}>
      <div style={monthContainerStyle}>
        {monthNames.map((month, index) => {
          const isSelected = index === selectedMonth;
          const isCurrentMonth = index === new Date().getMonth() && currentYear === new Date().getFullYear();

          return (
            <div
              key={index}
              onClick={() => handleMonthClick(index)}
              style={
                isSelected
                  ? selectedMonthStyle
                  : isCurrentMonth
                  ? currentMonthStyle
                  : monthStyle
              }
            >
              {month}
            </div>
          );
        })}
      </div>
        <div style={daysContainerStyle}>
    {days.map((day, index) => {
      const isToday =
        day === new Date().getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear();
      const isSelected = day === selectedDay;

      const dayDisplayStyle = isSelected
        ? selectedDayStyle
        : isToday
        ? currentDayStyle
        : dayStyle;

          return (
        <div
          key={index}
          onClick={() => handleDayClick(day)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={index === hoveredDay && !isSelected ? dayHoverStyle : dayDisplayStyle}
        >
          <div>{day}</div>
          <div>{getWeekDay(day)}</div>
        </div>
      );
    })}
  </div>
    </div>
  </div>
);
};

export default Calendariocm;



