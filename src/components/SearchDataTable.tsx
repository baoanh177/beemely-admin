import React, { useState } from "react";
import { ConfigProvider, Segmented } from "antd";

interface Option {
    label: string;
    value: string;
}

interface Props {
    options: Option[];
}

const SearchDataTable: React.FC<Props> = ({ options }) => {
    const [selectedValue, setSelectedValue] = useState<string>(options[0]?.label);
    const handleChange = (value: string) => {
        setSelectedValue(value);
        selectedValue
    };
    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Segmented: {
                            motionDurationMid: "0.01s",
                            motionDurationSlow: "0.01s",
                        },
                    },
                }}
            >
                <Segmented
                    onChange={handleChange}
                    options={options.map((option) => option.label)}
                />
            </ConfigProvider>
        </div>
    );
};

export default SearchDataTable;
