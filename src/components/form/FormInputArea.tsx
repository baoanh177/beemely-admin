import React from "react";
import { ConfigProvider, Input } from "antd";
const { TextArea } = Input;
import "@/assets/scss/overwrite/index.scss";

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
    <>
      {label && <label className="text-m-medium mb-1 text-black-300">{label}</label>}
      <TextArea
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        readOnly={isReadonly}
        defaultValue={defaultValue}
        rows={5}
        className="text-m-regular min-h-[500px] bg-gray-25 px-2 py-3"
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};
export default FormInputArea;
