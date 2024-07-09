import React from "react";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";

interface DateRangePickerProps {
  label?: string;
  onChange?: (dates: [Dayjs | null, Dayjs | null], dateStrings: [string, string]) => void;
  defaultValue?: [Dayjs | null, Dayjs | null];
  value?: [Dayjs | null, Dayjs | null];
  name?: string;
  disabled?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ label, onChange, defaultValue, value, name, disabled }) => {
  const handleChange = (dates: any, dateStrings: [string, string]) => {
    if (onChange) {
      onChange(dates as [Dayjs | null, Dayjs | null], dateStrings);
    }
  };

  return (
    <div>
      {label && <div className="text-m-medium mb-1 text-black-300">{label}</div>}
      <DatePicker.RangePicker
        className="custom-datepicker w-full rounded-md bg-gray-25 py-2"
        onChange={handleChange}
        defaultValue={defaultValue}
        value={value}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};

export default DateRangePicker;
