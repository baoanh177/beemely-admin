import { ConfigProvider, Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/es/switch";

export interface IFormSwitchProps {
  checkedText?: string;
  uncheckedText?: string;
  onChange?: SwitchChangeEventHandler;
  idDisabled?: boolean;
}

const FormSwitch = ({ checkedText, uncheckedText, idDisabled, onChange }: IFormSwitchProps) => {
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
      <Switch unCheckedChildren={uncheckedText} checkedChildren={checkedText} disabled={idDisabled} onChange={onChange} />
    </ConfigProvider>
  );
};

export default FormSwitch;
