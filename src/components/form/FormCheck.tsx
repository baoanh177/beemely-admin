import { Checkbox, ConfigProvider } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import clsx from "clsx";

interface FormCheckProps {
  label?: string;
  onChange?: (isDefaultChecked: boolean) => void;
  isDefaultChecked?: boolean;
  isDisable?: boolean;
  name?: string;
}
false;
const FormCheck = ({ label, onChange, isDefaultChecked, name, isDisable }: FormCheckProps) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#883DCF",
          colorTextDisabled: "#fff",
          colorBgContainerDisabled: "#fff",
          colorBorder: "#883DCF",
        },
      }}
    >
      <div className={clsx("mb-4 flex items-center gap-2", isDisable && "opacity-65")}>
        <Checkbox
          name={name}
          defaultChecked={isDefaultChecked}
          disabled={isDisable}
          type="checkbox"
          onChange={(e) => !isDisable && handleChange(e)}
          className="rounded-md"
        />
        {label && <label className="text-m-semibold text-primary-500">{label}</label>}
      </div>
    </ConfigProvider>
  );
};

export default FormCheck;
