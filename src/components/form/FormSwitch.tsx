import { ConfigProvider, Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/es/switch";
import Label from "./Label";

export interface IFormSwitchProps {
  checkedText?: string;
  uncheckedText?: string;
  onChange?: SwitchChangeEventHandler;
  label?: string;
  name?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  checked?: boolean;
}

const FormSwitch = ({ checkedText, isDisabled, isRequired, uncheckedText, checked, label, onChange }: IFormSwitchProps) => {
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
      <div className="flex flex-col items-start gap-1">
        <Label text={label} isRequired={isRequired} />
        <Switch checked={checked} unCheckedChildren={uncheckedText} checkedChildren={checkedText} disabled={isDisabled} onChange={onChange} />
      </div>
    </ConfigProvider>
  );
};

export default FormSwitch;
