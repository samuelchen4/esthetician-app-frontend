import React, { useState } from 'react';
import DatePickerComponent from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePickerComponent
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      className='px-3 py-1 border rounded-lg'
    />
  );
};

export default DatePicker;
