import React, { useState } from "react";

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
    selectedValue;
  };

  return (
    <div>
      <div className="flex h-[40px] cursor-pointer items-center rounded-lg border border-gray-100 bg-white">
        {options.map((option, index) => (
          <div
            key={index}
            className={`text-m-medium mx-1 my-1 px-3 py-1 ${
              selectedValue === option.label ? "text-m-semibold rounded-md bg-primary-50 text-primary-500" : "text-gray-500"
            } outline-none`}
            onClick={() => handleChange(option.label)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDataTable;
