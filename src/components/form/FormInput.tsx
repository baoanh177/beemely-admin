import clsx from "clsx";
import { IconType } from "react-icons";

interface FormInputProps {
  label?: string;
  icon?: IconType;
  placeholder?: string;
  name?: string;
  type: "text" | "number" | "password";
  value?: string | number;
  defaultValue?: string | number;
  isDisabled?: boolean;
  isReadonly?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  onChange?: (value: string | number) => void;
}

const FormInput = ({
  label,
  type,
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
}: FormInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (onChange) {
      const newValue = e.target.type === "number" ? parseFloat(inputValue) : inputValue;
      onChange(newValue);
    }
  };

  return (
    <div>
      {label && <label className="text-m-medium mb-1 text-black-300">{label}</label>}
      <div className="flex shrink-0 items-center gap-1 overflow-hidden rounded-[8px] border border-gray-100">
        {Icon && <Icon className="text-gray-400" />}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          defaultValue={defaultValue as string}
          disabled={isDisabled}
          name={name}
          readOnly={isReadonly}
          onBlur={onBlur}
          className={clsx(
            "text-m-regular placeholder:text-m-medium flex-1 grow bg-gray-25 px-3 py-[9px] text-black-500 outline-none focus:bg-white",
            { "border-red-500": error },
          )}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
