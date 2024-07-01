import React from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import clsx from "clsx";

interface FormDateProps {
  label?: string;
  onChange?: (date: Dayjs | null, dateString: string) => void;
  defaultValue?: Dayjs | null;
}

const FormDate: React.FC<FormDateProps> = ({ label, onChange, defaultValue }: FormDateProps) => {
  const handleChange: DatePickerProps<Dayjs>["onChange"] = (date, dateString) => {
    if (onChange) {
      onChange(date, dateString as string);
    }
  };

  return (
    <div className={clsx("mb-4 flex items-center gap-2")}>
      {label && <div className="text-m-medium mb-1 text-black-300">{label}</div>}
      <DatePicker onChange={handleChange} defaultValue={defaultValue} className="rounded-md bg-gray-25" />
    </div>
  );
};

export default FormDate;
