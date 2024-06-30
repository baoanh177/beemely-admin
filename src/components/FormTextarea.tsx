import React, { ReactNode } from "react";
import clsx from "clsx";

interface FormAreaProps {
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
}

const FormTextArea = ({ label, placeholder = "", icon, onChange, value, defaultValue }: FormAreaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="mb-4 flex flex-col">
      {label && <label className="mb-2 text-sm font-medium text-black-300">{label}</label>}
      <div className="flex items-center gap-1 rounded-[8px] border border-gray-100 bg-gray-25 px-[14px] py-[10px]">
        {icon && <span className="icon-container">{icon}</span>}
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          defaultValue={defaultValue}
          className={clsx("text-m-regular flex-1 bg-gray-25 font-normal text-black-500 outline-none")}
        />
      </div>
    </div>
  );
};

export default FormTextArea;
