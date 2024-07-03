import React, { useState } from 'react';
import { ConfigProvider, Segmented } from 'antd';

const StartComponent: React.FC = () => <div>1 Component</div>;
const CenterComponent: React.FC = () => <div>2 Component</div>;
const EndComponent: React.FC = () => <div>3 Component</div>;
const LeftComponent: React.FC = () => <div>4 Component</div>;

interface Option {
    label: string;
    value: React.FC;
}

const options: Option[] = [
    { label: 'Product All', value: StartComponent },
    { label: 'Published', value: CenterComponent },
    { label: 'Low Stock', value: EndComponent },
    { label: 'Draft', value: LeftComponent },
];
const StatusFilter: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string>('Product All');

    const handleChange = (value: string) => {
        setSelectedValue(value);
    };

    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Segmented: {
                            motionDurationMid: "0.01s",
                            motionDurationSlow: "0.01s"
                        },
                    },
                }}
            >
                <Segmented
                    onChange={handleChange}
                    options={options.map(option => option.label)}
                />
                {options.find(option => option.label === selectedValue)?.value("")}
            </ConfigProvider>
        </div>
    );
};

export default StatusFilter;
