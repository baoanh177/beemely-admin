import React from "react";
import { Input } from "antd";
import clsx from "clsx";
const { TextArea } = Input;

interface FormInputAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  isReadonly?: boolean;
  onChange?: (value: string) => void;
  error?: string;
}
const FormInputArea: React.FC<FormInputAreaProps> = ({ label, placeholder, value, isReadonly, defaultValue, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (onChange) {
      onChange(inputValue);
    }
  };
  return (
    <div>
      {label && <label className="text-m-medium mb-1 text-black-300">{label}</label>}
      <TextArea
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        readOnly={isReadonly}
        defaultValue={defaultValue}
        rows={5}
        className={clsx("text-m-regular custom-textarea min-h-[500px] bg-gray-25 px-2 py-3", { readonly: isReadonly })}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
export default FormInputArea;
