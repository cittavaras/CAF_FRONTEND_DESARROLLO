import React, { useState } from 'react';

const wrapStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  overflow: 'hidden',
};

const calendarContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  backgroundColor: '#f0f0f0',
};

const monthContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',
};

const daysContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  overflowX: 'scroll',
  whiteSpace: 'nowrap',
};

const arrowStyle = {
  cursor: 'pointer',
  margin: '0 1rem',
};

const dayStyle = {
  display: 'inline-block',
  padding: '1rem',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  margin: '0 3px',
  borderRadius: '4px',
};

const dayHoverStyle = {
  ...dayStyle,
  backgroundColor: '#eeeeee',
};

const selectedDayStyle = {
  ...dayStyle,
  backgroundColor: '#77d3ef',
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(-1);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  const handleMouseEnter = (index) => {
    setHoveredDay(index);
  };

  const handleMouseLeave = () => {
    setHoveredDay(-1);
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const currentMonthName = monthNames[currentMonth];
  const [selectedDay, setSelectedDay] = useState(null);

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const getWeekDay = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return weekDays[date.getDay()];
  };

return (
  <div style={wrapStyle}>
    <div style={calendarContainerStyle}>
      <div style={monthContainerStyle}>
        <span onClick={handlePrevMonth} style={arrowStyle}>&lt;</span>
        <span>{currentMonthName} {currentYear}</span>
        <span onClick={handleNextMonth} style={arrowStyle}>&gt;</span>
      </div>
      <div style={daysContainerStyle}>
        {days.map((day, index) => {
          const isToday =
            day === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear();
          const isSelected = day === selectedDay;

          const currentDayStyle = isSelected
            ? selectedDayStyle
            : isToday
            ? dayHoverStyle
            : dayStyle;

          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={index === hoveredDay && !isSelected ? dayHoverStyle : currentDayStyle}
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

export default Calendar;