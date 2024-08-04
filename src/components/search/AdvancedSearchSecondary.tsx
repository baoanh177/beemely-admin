import { Dayjs } from "dayjs";
import FormCheck from "../form/FormCheck";
import FormDateRangePicker from "../form/FormDateRangePicker";
import FormInput from "../form/FormInput";
import FormSwitch from "../form/FormSwitch";
import FilterTableStatus, { IFilterTableStatusOptions } from "../table/FilterTableStatus";
import { CheckField, DateField, IAdvancedSearch, StatusField, SwitchField, TextNumberField } from "../table/PrimaryTable";

interface IAdvancedSearchSecondaryProps {
  advanced: IAdvancedSearch;
}

type FieldValue = string | number | [Dayjs | null, Dayjs | null] | IFilterTableStatusOptions | boolean;
const AdvancedSearchSecondary = ({ advanced }: IAdvancedSearchSecondaryProps) => {
  const handleAdvancedChange = (value: FieldValue) => {
    // để tạm
    <div>{!value}</div>;
  };

  const renderAdvancedField = (field: TextNumberField | DateField | StatusField | SwitchField | CheckField) => {
    const fieldKey = field.name;
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
            options={field.options as IFilterTableStatusOptions[]}
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
    <div>
      <div>
        <div className="flex flex-col gap-3 pt-3">
          <div className="text-xl-semibold">Tìm kiếm nâng cao</div>
          <div className="flex justify-center">{advanced.filter((field) => field.type === "status").map(renderAdvancedField)}</div>
          <div className="grid grid-cols-3 gap-3">{advanced.filter((field) => field.type !== "status").map(renderAdvancedField)}</div>
        </div>
      </div>
    </div>
  );
};
export default AdvancedSearchSecondary;
