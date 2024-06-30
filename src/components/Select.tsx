import { ConfigProvider, Select } from "antd";
import clsx from "clsx";
interface ICustomSelect {
    label?: string;
    placeholder?: string;
    options: { value: string; label: string }[];
    defaultValue?: string | string[];
    isMultiple?: boolean;
    width?: string;
    onChange?: (value: string | string[]) => void;
}

const CustomSelect = ({
    label,
    placeholder,
    options,
    defaultValue,
    isMultiple,
    width = "w-[216px]",
    onChange,
}: ICustomSelect) => (
    <ConfigProvider
        theme={{
            components: {
                Select: {
                    colorIconHover: "#883DCF",
                    colorIcon: "#883DCF",
                    multipleItemHeight: 33

                },
            },
        }}
    >
        <div className="mb-1 text-black-300 text-sm font-medium">{label}</div>
        <Select
            className={clsx(isMultiple && "text-primary-400", "min-h-[40px]", width)}
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
        />
    </ConfigProvider>
);

export default CustomSelect;
