import React from "react";
import { ConfigProvider, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import viVN from "antd/es/locale/vi_VN";
import type { Dayjs } from "dayjs";
import clsx from "clsx";

interface FormDateProps {
  label?: string;
  onChange?: (date: Dayjs | null, dateString: string) => void;
  defaultValue?: Dayjs | null;
  name?: string;
  value?: Dayjs | null;
  disabled?: boolean;
  placeholder?: string;
}

const FormDate: React.FC<FormDateProps> = ({ label, onChange, defaultValue, value, name, disabled, placeholder }: FormDateProps) => {
  const handleChange: DatePickerProps<Dayjs>["onChange"] = (date, dateString) => {
    if (onChange) {
      onChange(date, dateString as string);
    }
  };

  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: "#883DCF",
          colorPrimaryHover: "#883DCF",
          colorPrimaryActive: "#883DCF",
        },
      }}
    >
      <div className={clsx("flex flex-col")}>
        {label && <div className="text-m-medium mb-1 text-black-300">{label}</div>}

        <DatePicker
          name={name}
          placeholder={placeholder}
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
