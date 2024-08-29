import React, { useState, useEffect } from 'react';
import { convertToAMPM } from 'src/lib/utils';

const daysOfWeek = ['', 'SUN', 'M', 'T', 'W', 'Th', 'F', 'S'];

const EventCalendar = ({ selectedHours, setSelectedHours }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(() => {
    console.log(selectedHours);
  }, [selectedHours]);

  useEffect(() => {
    // Initialize the state for each day with empty arrays
    const initialSelection = {};
    daysOfWeek.forEach((day) => {
      initialSelection[day] = [];
    });
    setSelectedHours(initialSelection);
  }, []);

  const toggleHour = (day, hour) => {
    setSelectedHours((prevState) => {
      const newSelected = { ...prevState };
      const dayHours = newSelected[day];
      const hourIndex = dayHours.indexOf(hour);

      if (hourIndex === -1) {
        // If hour is not selected, add it
        newSelected[day] = [...dayHours, hour];
      } else {
        // If hour is already selected, remove it
        newSelected[day] = dayHours.filter((h) => h !== hour);
      }

      return newSelected;
    });
  };

  const handleMouseDown = (day, hour) => {
    setIsDragging(true);
    setCurrentDay(day);
    toggleHour(day, hour);
  };

  const handleMouseEnter = (day, hour) => {
    if (isDragging && day === currentDay) {
      toggleHour(day, hour);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentDay(null);
  };

  return (
    <div className='flex user-select-none' onMouseUp={handleMouseUp}>
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className='flex-1 border-r border-gray-300 last:border-r-0'
        >
          <div
            className={`bg-gray-100 text-center py-2 font-semibold border-b border-gray-300 h-10 w-10 ${
              day === '' && 'bg-white w-20'
            }`}
          >
            {day}
          </div>
          {Array.from({ length: 24 }, (_, hour) => (
            <div
              key={`${day}-${hour}`}
              className={`h-10 w-10 border-b border-gray-200 flex items-center justify-center cursor-pointer
              ${
                selectedHours[day]?.includes(hour)
                  ? day !== '' && 'bg-green-500 text-white'
                  : day !== '' && 'hover:bg-gray-200'
              }
              ${day === '' && 'w-20 cursor-none'}
              `}
              onMouseDown={() => handleMouseDown(day, hour)}
              onMouseEnter={() => handleMouseEnter(day, hour)}
            >
              {day === '' && convertToAMPM(hour)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventCalendar;
