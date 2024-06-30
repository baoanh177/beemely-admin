import React, { ReactNode } from "react";
import clsx from "clsx";

interface ICommon {
  label: string;
  placeholder?: string;
  icon?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

interface ITextInput extends ICommon {
  type: "text" | "number";
  value: string | number;
  defaultValue?: string | number;
}

interface ITextareaInput extends ICommon {
  type: "textarea";
  value: string;
  defaultValue?: string;
}

interface IRadioCheckboxInput extends ICommon {
  type: "radio" | "checkbox";
  value: boolean | string;
  options: { label: string; value: string }[];
}

interface ISelectInput extends ICommon {
  type: "select";
  value: string;
  options: { label: string; value: string }[];
}

interface IDateInput extends ICommon {
  type: "date";
  value: string;
  defaultValue?: string;
}

type IInput = ITextInput | ITextareaInput | IRadioCheckboxInput | ISelectInput | IDateInput;

const Input = (props: IInput) => {
  const { type, label, placeholder = "", icon, onChange } = props;

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            placeholder={placeholder}
            value={props.value}
            onChange={onChange}
            defaultValue={props.defaultValue as string}
            className={clsx("text-m-regular flex-1 bg-gray-25 font-normal text-black-500 outline-none")}
          />
        );
      case "radio":
      case "checkbox":
        return (props as IRadioCheckboxInput).options.map((option) => (
          <label key={option.value} className="text-m-semibold flex items-center gap-1 text-primary-500">
            <input
              type={type}
              name={label}
              value={option.value}
              checked={type === "radio" ? props.value === option.value : (props.value as boolean)}
              onChange={onChange}
              className="mr-2 rounded-md"
            />
            {option.label}
          </label>
        ));
      case "select":
        return (
          <select
            value={props.value}
            onChange={onChange}
            className={clsx("text-m-regular flex-1 bg-gray-25 font-normal text-black-500 outline-none")}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {(props as ISelectInput).options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "date":
        return (
          <input
            type="date"
            placeholder={placeholder}
            value={props.value}
            onChange={onChange}
            defaultValue={props.defaultValue as string}
            className={clsx("text-m-regular flex-1 bg-gray-25 font-normal text-black-500 outline-none")}
          />
        );
      default:
        return (
          <input
            type={type}
            placeholder={placeholder}
            value={props.value}
            onChange={onChange}
            defaultValue={props.defaultValue as string | number}
            className={clsx("text-m-regular flex-1 bg-gray-25 font-normal text-black-500 outline-none")}
          />
        );
    }
  };

  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-2 text-sm font-medium text-black-300">{label}</label>
      <div className="flex items-center gap-1 rounded-[8px] border border-gray-100 bg-gray-25 px-[14px] py-[10px]">
        {icon && <span className="icon-container">{icon}</span>}
        {renderInput()}
      </div>
    </div>
  );
};

export default Input;
