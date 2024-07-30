import { Dayjs } from "dayjs";
import FilterTableStatus, { IFilterTableStatusOptions } from "../table/FilterTableStatus";
import FormInput from "../form/FormInput";
import FormDateRangePicker from "../form/FormDateRangePicker";
import FormSwitch from "../form/FormSwitch";
import FormCheck from "../form/FormCheck";
import { CheckField, DateField, IAdvancedSearch, StatusField, SwitchField, TextNumberField } from "../table/PrimaryTable";

interface IAdvancedSearchProps {
  advanced: IAdvancedSearch;
}
type FieldValue = string | number | [Dayjs | null, Dayjs | null] | IFilterTableStatusOptions | boolean;
const AdvancedSearch = ({ advanced }: IAdvancedSearchProps) => {
  const handleAdvancedChange = (value: FieldValue) => {
    <div>{!value}</div>;
  };

  const renderAdvancedField = (field: TextNumberField | DateField | StatusField | SwitchField | CheckField) => {    const fieldKey = field.name;
    switch (field.type) {
      case "text":
      case "number":
        return (
          <FormInput
            key={fieldKey}
            type={field.type}
            placeholder={field.placeholder}
            onChange={(value: string | number) => handleAdvancedChange(value)}
            icon={field.icon}
            className="bg-white"
          />
        );
      case "date":
        return (
          <FormDateRangePicker
            key={fieldKey}
            placeholder={field.placeholder}
            onChange={(dates: [Dayjs | null, Dayjs | null]) => handleAdvancedChange(dates)}
            defaultValue={undefined}
            disabled={false}
            name={field.name}
          />
        );
      case "status":
        return (
          <FilterTableStatus
            key={fieldKey}
            options={field.options}
            onChange={(selectedOption: IFilterTableStatusOptions) => handleAdvancedChange(selectedOption)}
          />
        );
      case "switch":
        return (
          <FormSwitch
            key={fieldKey}
            checkedText={field.checkedText}
            uncheckedText={field.uncheckedText}
            onChange={(checked: boolean) => handleAdvancedChange(checked)}
            idDisabled={field.idDisabled}
            label={field.label}
          />
        );
      case "check":
        return (
          <FormCheck
            key={fieldKey}
            isDefaultChecked={field.isDefaultChecked}
            isDisable={field.isDisable}
            onChange={(checked: boolean) => handleAdvancedChange(checked)}
            label={field.label}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="text-xl-semibold pt-3">Tìm kiếm nâng cao</div>
      <div className="flex justify-between">
        {advanced.filter((field) => field.type === "status").map(renderAdvancedField)}
        {advanced.filter((field) => field.type === "date").map(renderAdvancedField)}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {advanced.filter((field) => field.type !== "date" && field.type !== "status").map(renderAdvancedField)}
      </div>
    </div>
  );
};

export default AdvancedSearch;
