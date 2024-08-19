import { Checkbox, ConfigProvider, Radio } from "antd";
import clsx from "clsx";

export interface FormCheckProps {
  type?: "checkbox" | "radio";
  label?: string;
  onChange?: (isDefaultChecked: boolean) => void;
  isDefaultChecked?: boolean;
  isDisable?: boolean;
  checked?: boolean;
  value?: string;
  name?: string;
}
false;
const FormCheck = ({ type = "checkbox", label, onChange, checked, value, isDefaultChecked, name, isDisable }: FormCheckProps) => {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#883DCF",
          colorTextDisabled: "#fff",
          colorBgContainerDisabled: "#fff",
        },
      }}
    >
      <div className={clsx("flex items-center gap-2", isDisable && "opacity-65")}>
        {type === "checkbox" ? (
          <Checkbox
            name={name}
            defaultChecked={isDefaultChecked}
            checked={checked}
            value={value}
            disabled={isDisable}
            onChange={(e) => {
              if (!isDisable && onChange) onChange(e.target.checked);
            }}
            className="rounded-md"
          />
        ) : (
          <Radio
            name={name}
            checked={checked}
            value={value}
            defaultChecked={isDefaultChecked}
            disabled={isDisable}
            onChange={(e) => {
              if (!isDisable && onChange) onChange(e.target.checked);
            }}
          />
        )}
        {label && <label className="text-m-medium text-black-300">{label}</label>}
      </div>
    </ConfigProvider>
  );
};

export default FormCheck;
