import React, { useState } from 'react';
import './calendar.css';

const generateCalendarMatrix = (year: number, month: number) => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const daysInMonth = endDate.getDate();
  const startDay = startDate.getDay();
  const calendarMatrix: (number | null)[] = [];

  // Fill the calendar with empty slots before the first day of the month
  for (let i = 0; i < startDay; i++) {
    calendarMatrix.push(null);
  }

  // Fill the calendar with the actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarMatrix.push(day);
  }

  // Fill the calendar with empty slots after the last day of the month
  const endDay = endDate.getDay();
  for (let i = endDay + 1; i < 7; i++) {
    calendarMatrix.push(null);
  }

  // Split the calendar into weeks
  const weeks = [];
  for (let i = 0; i < calendarMatrix.length; i += 7) {
    weeks.push(calendarMatrix.slice(i, i + 7));
  }

  return weeks;
};

interface CalendarProps {
  currentDate: Date;
  onMonthChange: (newDate: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, onMonthChange }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const weeks = generateCalendarMatrix(year, month);

  const handlePrevMonth = () => {
    onMonthChange(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    onMonthChange(new Date(year, month + 1));
  };

  return (
    <div className='calendar'>
      <header className='header'>
        <button onClick={handlePrevMonth}>{'<'}</button>
        <h2>{`${year}년 ${month + 1}월`}</h2>
        <button onClick={handleNextMonth}>{'>'}</button>
      </header>
      <div className='calendar-grid'>
        <div className='calendar-header'>
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
        {weeks.map((week, index) => (
          <div key={index} className='calendar-week'>
            {week.map((day, idx) => (
              <div
                key={idx}
                className={`calendar-day ${day === null ? 'empty' : ''}`}>
                {day !== null ? day : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
