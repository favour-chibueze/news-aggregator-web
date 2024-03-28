import React, { useState, useEffect } from 'react';
import { DateRangePickerProps } from '../../typing';


const DateRangePicker: React.FC<DateRangePickerProps> = ({ onQueryStringChange }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    if (startDate && endDate) {
      onQueryStringChange({startDate, endDate});
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="dateRange" className="block text-sm font-medium mb-2">
        Date Range
      </label>
      <div id="dateRange" className="flex items-center">
        <input
          id="startDate"
          type="date"
          className="border border-gray-300 p-2 rounded-md mr-2"
          value={startDate}
          onChange={handleStartDateChange}
        />
        -
        <input
          id="endDate"
          type="date"
          className="border border-gray-300 p-2 rounded-md ml-2"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;


