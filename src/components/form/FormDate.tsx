import React from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import clsx from "clsx";

interface FormDateProps {
  label?: string;
  onChange?: (date: Dayjs | null, dateString: string) => void;
  defaultValue?: Dayjs | null;
  value?: Dayjs | null;
  disabled?: boolean;
}
const FormDate: React.FC<FormDateProps> = ({ label, onChange, defaultValue, value, disabled }: FormDateProps) => {
  const handleChange: DatePickerProps<Dayjs>["onChange"] = (date, dateString) => {
    if (onChange) {
      onChange(date, dateString as string);
    }
  };
  return (
    <div className={clsx("flex items-center gap-2")}>
      {label && <div className="text-m-medium mb-1 text-black-300">{label}</div>}
      <DatePicker
        onChange={handleChange}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        className="custom-datepicker text-m-regular rounded-md px-[14px] py-[10px]"
      />
    </div>
  );
};

export default FormDate;
