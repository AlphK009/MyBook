import React from 'react';

interface DatePickerFilterProps {
  onFilterByYear: (selectedYear: string) => void;
}

const DatePickerFilter: React.FC<DatePickerFilterProps> = ({ onFilterByYear }) => {
  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterByYear(event.target.value);
  };

  return (
    <input
      type="text"
      name="year"
      onChange={handleYearChange}
      placeholder="Filter tahun terbit"
      className="border p-2 rounded-md"
    />
  );
};

export default DatePickerFilter;
