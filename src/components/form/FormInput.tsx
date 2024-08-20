import clsx from "clsx";
import { useState, useRef } from "react";
import { IconType } from "react-icons";
import Label from "./Label";

export interface IFormInputProps {
  label?: string;
  icon?: IconType;
  placeholder?: string;
  name?: string;
  type?: "text" | "number" | "password";
  value?: string | number;
  defaultValue?: string | number;
  isDisabled?: boolean;
  isReadonly?: boolean;
  autoFocus?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  onChange?: (value: string | number) => void;
  className?: string;
  isRequired?: boolean;
}

const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  defaultValue,
  name,
  icon: Icon,
  isDisabled,
  isReadonly,
  onBlur,
  error,
  onChange,
  autoFocus,
  className,
  isRequired = false,
}: IFormInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (onChange) {
      const newValue = e.target.type === "number" ? parseFloat(inputValue) : inputValue;
      onChange(newValue);
    }
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <Label text={label} isRequired={isRequired} />}
      <div
        className={clsx(
          "flex shrink-0 items-center gap-1 overflow-hidden rounded-[8px] border border-gray-100 bg-white",
          isFocused && "bg-white",
        )}
      >
        {Icon && (
          <Icon
            className={clsx("ml-3 cursor-pointer text-gray-400", {
              "text-black-500": isFocused,
            })}
            onClick={handleIconClick}
          />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          autoFocus={autoFocus}
          onChange={handleChange}
          defaultValue={defaultValue as string}
          disabled={isDisabled}
          name={name}
          readOnly={isReadonly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          className={clsx(
            "text-m-regular placeholder:text-m-medium w-full flex-1 grow bg-gray-25 py-[8.5px] text-black-500 outline-none focus:bg-white",
            {
              "px-3": !Icon,
              "pl-0": Icon,
              "border-red-500": error,
              "select-none !bg-gray-50 !text-black-300": isDisabled,
            },
            className,
          )}
        />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default FormInput;
