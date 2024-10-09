import { ConfigProvider, Select } from "antd";
import clsx from "clsx";
import Label from "./Label";
interface IFormSelect {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  defaultValue?: string | string[];
  isMultiple?: boolean;
  error?: string;
  isDisabled?: boolean;
  value?: string | string[] | undefined;
  isRequired?: boolean;
  onChange?: (value: string | string[]) => void;
}

const FormSelect = ({ label, value, isDisabled, placeholder, options, error, defaultValue, isMultiple, onChange, isRequired }: IFormSelect) => {
  const handleChange = (value: string | string[]) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              optionSelectedBg: "#f4ecfb",
              colorPrimary: "#883dcf",
            },
          },
        }}
      >
        <div className="flex flex-col gap-1">
          <Label text={label} isRequired={isRequired}/>
          <Select
            allowClear
            maxTagCount={"responsive"}
            value={value}
            disabled={isDisabled}
            className={clsx("text-m-medium w-full", isDisabled && "opacity-65")}
            mode={isMultiple ? "multiple" : undefined}
            defaultValue={defaultValue}
            onChange={(value) => !isDisabled && handleChange(value)}
            showSearch
            placeholder={placeholder}
            optionFilterProp="label"
            filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
            options={options}
          />
          {error && <div className="text-sm text-red-500">{error}</div>}
        </div>
      </ConfigProvider>
    </div>
  );
};

export default FormSelect;
