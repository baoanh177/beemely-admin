import { useState } from "react";
import FilterTableStatus, { IFilterTableStatusOption } from "../table/FilterTableStatus";
import FormInput from "../form/FormInput";
import { IconType } from "react-icons";
import { Dayjs } from "dayjs";
import FormDateRangePicker from "../form/FormDateRangePicker";
import FormSwitch from "../form/FormSwitch";
import FormCheck from "../form/FormCheck";
import Button from "../common/Button";
import DefaultSearch from "./DefaultSearch";

export interface IAdvancedSearchSecondaryProp {
  advanced: Field[];
  normal?: IFilterTableStatusOption[];
}

interface BaseField {
  name: string;
}

interface TextField extends BaseField {
  type: "text";
  placeholder?: string;
  icon?: IconType;
  onChange?: (value: string) => void;
}

interface NumberField extends BaseField {
  type: "number";
  placeholder?: string;
  icon?: IconType;
  onChange?: (value: number) => void;
}

interface DateField extends BaseField {
  type: "date";
  placeholder?: [string, string];
  onChange?: (dates: [Dayjs | null, Dayjs | null]) => void;
}

interface StatusField extends BaseField {
  type: "status";
  options?: IFilterTableStatusOption[];
  onChange?: (selectedOption: IFilterTableStatusOption) => void;
}

interface SwitchField extends BaseField {
  type: "switch";
  switchProps?: {
    checkedText: string;
    uncheckedText: string;
  };
  onChange?: (checked: boolean) => void;
}

interface CheckField extends BaseField {
  type: "check";
  checkProps?: {
    isDefaultChecked: boolean;
    isDisable: boolean;
    label: string;
  };
  onChange?: (checked: boolean) => void;
}

type Field = TextField | NumberField | DateField | StatusField | SwitchField | CheckField;

const AdvancedSearchSecondary = ({ advanced, normal }: IAdvancedSearchSecondaryProp) => {
  const [advancedValues, setAdvancedValues] = useState<Record<string, any>>({});
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleAdvancedChange = (name: string, value: any) => {
    setAdvancedValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setAdvancedValues({});
  };

  const handleFilterToggle = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const renderAdvancedField = (field: Field) => {
    const fieldKey = `${field.name}-${advancedValues[field.name]}`;
    switch (field.type) {
      case "text":
        return (
          <div key={field.name}>
            <FormInput
              type="text"
              placeholder={field.placeholder as string}
              onChange={(value: string | number) => handleAdvancedChange(field.name, value)}
              icon={field.icon}
              value={advancedValues[field.name] || ""}
            />
          </div>
        );
      case "number":
        return (
          <div key={fieldKey}>
            <FormInput
              type="number"
              placeholder={field.placeholder as string}
              onChange={(value: number | string) => handleAdvancedChange(field.name, value)}
              icon={field.icon}
              value={advancedValues[field.name] || ""}
            />
          </div>
        );
      case "date":
        return (
          <div key={fieldKey}>
            <FormDateRangePicker
              placeholder={field.placeholder as [string, string]}
              onChange={(dates: [Dayjs | null, Dayjs | null]) => handleAdvancedChange(field.name, dates)}
              defaultValue={undefined}
              disabled={false}
              name={field.name}
              value={advancedValues[field.name]}
            />
          </div>
        );
      case "status":
        return (
          <div className="flex h-[40px] w-full justify-center" key={fieldKey}>
            <FilterTableStatus
              options={field.options || []}
              onChange={(selectedOption: IFilterTableStatusOption) => handleAdvancedChange(field.name, selectedOption)}
            />
          </div>
        );
      case "switch":
        return (
          <div key={fieldKey}>
            <FormSwitch
              checkedText={field.switchProps?.checkedText || ""}
              uncheckedText={field.switchProps?.uncheckedText || ""}
              onChange={(checked: boolean) => handleAdvancedChange(field.name, checked)}
              idDisabled={false}
              label={field.name}
            />
          </div>
        );
      case "check":
        return (
          <div key={fieldKey}>
            <FormCheck
              isDefaultChecked={field.checkProps?.isDefaultChecked || false}
              isDisable={field.checkProps?.isDisable || false}
              onChange={(checked: boolean) => handleAdvancedChange(field.name, checked)}
              label={field.checkProps?.label || ""}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleButtonClick = () => {
    // console.log(advancedValues);
  };
  return (
    <div>
      <div className="flex flex-col gap-3">
        <DefaultSearch showFilterStatus={true} option={normal || []} onFilterToggle={handleFilterToggle} />
      </div>
      <div>
        {isFilterVisible && (
          <div className="flex flex-col gap-3 pt-3">
            <div>Tìm kiếm nâng cao</div>
            <div className="flex justify-between">{advanced.filter((field) => field.type === "status").map(renderAdvancedField)}</div>
            <div className="grid grid-cols-3 gap-3">{advanced.filter((field) => field.type !== "status").map(renderAdvancedField)}</div>
            <div className="flex justify-end gap-3">
              <Button text="Button" type="primary" onClick={handleButtonClick} />
              <Button text="Reset" type="secondary" onClick={handleReset} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdvancedSearchSecondary;
