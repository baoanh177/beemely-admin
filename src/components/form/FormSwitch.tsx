import { ConfigProvider, Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/es/switch";

export interface IFormSwitchProps {
  checkedText?: string;
  uncheckedText?: string;
  onChange?: SwitchChangeEventHandler;
  idDisabled?: boolean;
  label?: string;
  name?: string;
  checked?: boolean
}

const FormSwitch = ({ checkedText, checked, uncheckedText, idDisabled, label, onChange }: IFormSwitchProps) => {
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
        <Switch checked={checked} unCheckedChildren={uncheckedText} checkedChildren={checkedText} disabled={idDisabled} onChange={onChange} />
      </div>
    </ConfigProvider>
  );
};

export default FormSwitch;