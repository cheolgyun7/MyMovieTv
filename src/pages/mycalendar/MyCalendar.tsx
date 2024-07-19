import React, { useState } from 'react';
import Calendar from '../../component/calendar/Calendar';
import './mycalendar.css';
import SavedContents from '../../component/saved/SavedContents';

const MyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className='my-calendar-container'>
      <Calendar currentDate={currentDate} onMonthChange={setCurrentDate} />
      <SavedContents />
    </div>
  );
};

export default MyCalendar;
