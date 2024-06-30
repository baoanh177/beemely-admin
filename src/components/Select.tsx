import { Select } from "antd";
interface ICustomSelect {
    label?: string;
    placeholder?: string;
    options: { value: string; label: string }[];
    defaultValue?: string | string[];
    isMultiple?: boolean;
    onChange?: (value: string | string[]) => void;
}

const CustomSelect = ({
    label,
    placeholder,
    options,
    defaultValue,
    isMultiple,
    onChange,
}: ICustomSelect) => (
    <>
        <div className="mb-1 text-black-300 ">{label}</div>
        <Select
            allowClear
            maxTagCount={"responsive"}
            className="w-full text-m-medium"
            mode={isMultiple ? "multiple" : undefined}
            defaultValue={defaultValue}
            onChange={onChange}
            showSearch
            placeholder={placeholder}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={options}
        /></>
);

export default CustomSelect;
