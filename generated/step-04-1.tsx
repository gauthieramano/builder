import React from 'react';

const Calendar = () => {

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = new Date(2023, 10, 0).getDate(); // November 2023

  // Generate an array of days for the calendar
  const generateDays = () => {
    const daysArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }
    return daysArray;
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-5">Calendar</h1>
      <div className="grid grid-cols-7 gap-4 text-center">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="font-semibold">
            {day}
          </div>
        ))}
        {generateDays().map((day, index) => (
          <div
            key={index}
            className="h-12 flex items-center justify-center border rounded-md"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;