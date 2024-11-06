import React from "react";

interface DatePickerProps {
  selectedDate: string | null;
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="date"
        value={selectedDate || ""}
        onChange={(e) => onDateChange(e.target.value)}
        className="border p-2"
        placeholder="Select Date"
      />
    </div>
  );
};

export default DatePicker;
