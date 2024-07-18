import { ConfigProvider, Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/es/switch";

export interface IFormSwitchProps {
  checkedText?: string;
  uncheckedText?: string;
  onChange?: SwitchChangeEventHandler;
  idDisabled?: boolean;
  label?: string;
}

const FormSwitch = ({ checkedText, uncheckedText, idDisabled, label, onChange }: IFormSwitchProps) => {
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
        {label && <div className="text-m-medium text-black-300 mb-1">{label}</div>}
        <Switch unCheckedChildren={uncheckedText} checkedChildren={checkedText} disabled={idDisabled} onChange={onChange} />
      </div>
    </ConfigProvider>
  );
};

export default FormSwitch;
