import React, { ReactNode } from "react";
import clsx from "clsx";

interface FormSelectProps {
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  onChange?: (value: string) => void;
  value?: string;
  options: { label: string; value: string }[];
}

const FormSelect = ({ label, placeholder = "", icon, onChange, value, options }: FormSelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="mb-4 flex flex-col">
      {label && <label className="mb-2 text-sm font-medium text-black-300">{label}</label>}
      <div className="flex items-center gap-1 rounded-[8px] border border-gray-100 bg-gray-25 px-[14px] py-[10px]">
        {icon && <span className="icon-container">{icon}</span>}
        <select
          value={value}
          onChange={handleChange}
          className={clsx("text-m-regular flex-1 bg-gray-25 font-normal text-black-500 outline-none")}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;
