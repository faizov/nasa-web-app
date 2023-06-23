import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  date: Date | null;
  onChange: (_: Date | null) => void;
  minDate: string;
  maxDate?: string;
};

export const SelectDate = ({ date, onChange, maxDate, minDate }: Props) => {
  return (
    <DatePicker
      selected={date}
      onChange={(date) => onChange(date)}
      maxDate={maxDate ? new Date(maxDate) : new Date()}
      minDate={new Date(minDate)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      className="date"
      showPopperArrow={false}
    />
  );
};
