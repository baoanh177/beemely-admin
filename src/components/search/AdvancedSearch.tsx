import { useState } from "react";
import FilterTableStatus, { IFilterTableStatusOptions, IFilterTableStatusProps } from "../table/FilterTableStatus";
import FormInput, { FormInputProps } from "../form/FormInput";
import { Dayjs } from "dayjs";
import FormDateRangePicker, { DateRangePickerProps } from "../form/FormDateRangePicker";
import FormSwitch, { IFormSwitchProps } from "../form/FormSwitch";
import FormCheck, { FormCheckProps } from "../form/FormCheck";
import DefaultSearch from "./DefaultSearch";

export interface IAdvancedSearchProps {
  advanced: Field[];
  normal?: IFilterTableStatusOptions[];
}

interface TextField extends FormInputProps {
  type: "text";
  name: string;
}
interface NumberField extends FormInputProps {
  type: "number";
  name: string;
}
interface DateField extends DateRangePickerProps {
  type: "date";
  name: string;
}
interface StatusField extends IFilterTableStatusProps {
  name: string;
  type: "status";
}
interface SwitchField extends IFormSwitchProps {
  name: string;
  type: "switch";
}
interface CheckField extends FormCheckProps {
  name: string;
  type: "check";
}

type Field = TextField | NumberField | DateField | StatusField | SwitchField | CheckField;
type FieldValue = string | number | [Dayjs | null, Dayjs | null] | IFilterTableStatusOptions | boolean;
const AdvancedSearch = ({ advanced, normal }: IAdvancedSearchProps) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleAdvancedChange = (name: string, value: FieldValue) => {
    console.log(name, value);
  };

  const handleFilterToggle = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const renderAdvancedField = (field: Field) => {
    const fieldKey = field.name;
    switch (field.type) {
      case "text":
        return (
          <div key={fieldKey}>
            <FormInput
              type="text"
              placeholder={field.placeholder as string}
              onChange={(value: string | number) => handleAdvancedChange(field.name, value)}
              icon={field.icon}
              className="bg-white"
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
              className="bg-white"
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
            />
          </div>
        );
      case "status":
        return (
          <div key={fieldKey}>
            <FilterTableStatus
              options={field.options || []}
              onChange={(selectedOption: IFilterTableStatusOptions) => handleAdvancedChange(field.name, selectedOption)}
            />
          </div>
        );
      case "switch":
        return (
          <div key={fieldKey}>
            <FormSwitch
              checkedText={field.checkedText || ""}
              uncheckedText={field.uncheckedText || ""}
              onChange={(checked: boolean) => handleAdvancedChange(field.name, checked)}
              idDisabled={field.idDisabled || false}
              label={field.label || ""}
            />
          </div>
        );
      case "check":
        return (
          <div key={fieldKey}>
            <FormCheck
              isDefaultChecked={field.isDefaultChecked || false}
              isDisable={field.isDisable || false}
              onChange={(checked: boolean) => handleAdvancedChange(field.name, checked)}
              label={field.label || ""}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <DefaultSearch showFilterStatus={true} option={normal || []} onFilterToggle={handleFilterToggle} />
      {isFilterVisible && (
        <>
          <div className="text-xl-semibold">Tìm kiếm nâng cao</div>
          <div className="flex justify-between">
            {advanced.filter((field) => field.type === "status").map(renderAdvancedField)}
            {advanced.filter((field) => field.type === "date").map(renderAdvancedField)}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {advanced.filter((field) => field.type !== "date" && field.type !== "status").map(renderAdvancedField)}
          </div>
        </>
      )}
    </div>
  );
};

export default AdvancedSearch;
