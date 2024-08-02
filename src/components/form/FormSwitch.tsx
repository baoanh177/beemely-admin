import { ConfigProvider, Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/es/switch";

export interface IFormSwitchProps {
  checkedText?: string;
  uncheckedText?: string;
  onChange?: (checked: 0 | 1) => void;
  idDisabled?: boolean;
  label?: string;
  name?: string;
  value?: 0 | 1;
}

const FormSwitch = ({ checkedText, uncheckedText, idDisabled, label, value = 0, onChange }: IFormSwitchProps) => {
  const handleChange: SwitchChangeEventHandler = (checked) => {
    onChange?.(checked ? 1 : 0);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: "#883DCF",
            colorPrimaryHover: "#883DCF",
          },
        },
      }}
    >
      <div className="flex flex-col items-start">
        {label && <div className="text-m-medium mb-1 text-black-300">{label}</div>}
        <Switch
          checked={value === 1}
          unCheckedChildren={uncheckedText}
          checkedChildren={checkedText}
          disabled={idDisabled}
          onChange={handleChange}
        />
      </div>
    </ConfigProvider>
  );
};

export default FormSwitch;
