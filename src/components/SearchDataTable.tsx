import React, { useState } from "react";
import { ConfigProvider, Segmented } from "antd";

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "Product All", value: "123" },
  { label: "Published", value: "234" },
  { label: "Low Stock", value: "123" },
  { label: "Draft", value: "123" },
];
const SearchDataTable: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("Product All");
  const handleChange = (value: string) => {
    setSelectedValue(value);
    selectedValue;
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
        <Segmented onChange={handleChange} options={options.map((option) => option.label)} />
      </ConfigProvider>
    </div>
  );
};

export default SearchDataTable;
