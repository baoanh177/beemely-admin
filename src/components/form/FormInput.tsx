import clsx from "clsx";

interface FormInputProps {
  label?: string;
  placeholder?: string;
  type: "text" | "number";
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
    <div className="mb-4 flex flex-col">
      {label && <label className="text-m-medium mb-1 text-black-300">{label}</label>}
      <div className="flex items-center gap-1 rounded-[8px] border border-gray-100 bg-gray-25 px-[14px] py-[10px]">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          defaultValue={defaultValue as string}
          disabled={isDisabled}
          readOnly={isReadonly}
          onBlur={onBlur}
          className={clsx("text-m-medium placeholder:text-m-medium flex-1 bg-gray-25 text-gray-400 outline-none", {
            "border-red-500": error,
          })}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
