import React from "react";
import { Input } from "antd";
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
const FormInputArea: React.FC<FormInputAreaProps> = ({
  label,
  placeholder,
  value,
  isReadonly,
  defaultValue,
  onChange,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (onChange) {
      onChange(inputValue);
    }
  };
  return (
    <>
      <br />
      {label && <label className="text-m-medium mb-1 text-black-300">{label}</label>}
      <TextArea
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        readOnly={isReadonly}
        defaultValue={defaultValue}
        rows={4}
        className="bg-gray-25"
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};
export default FormInputArea;
