import React from "react";
import { ConfigProvider, DatePicker } from "antd";
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#883DCF",
          colorPrimaryHover: "#883DCF",
          colorPrimaryActive: "#883DCF",
        },
      }}
    >
      <div className={clsx("flex items-center gap-2")}>
        {label && <div className="text-m-medium mb-1 text-black-300">{label}</div>}

        <DatePicker
          onChange={handleChange}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          className="custom-datepicker w-full rounded-md bg-gray-25 py-2"
        />
      </div>
    </ConfigProvider>
  );
};

export default FormDate;
