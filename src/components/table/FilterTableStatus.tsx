import React, { useMemo, useState } from "react";

export interface IFilterTableStatusOption {
  value: string
  label: string
}

interface IFilterTableStatusProps {
  options: IFilterTableStatusOption[];
}

const FilterTableStatus: React.FC<IFilterTableStatusProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<IFilterTableStatusOption>({ value: "all", label: "All" });

  const fullOptions = useMemo(() => [{ value: "all", label: "All" }, ...options], [JSON.stringify(options)]);

  return (
    <div>
      <div className="flex h-[40px] cursor-pointer items-center rounded-lg border border-gray-100 bg-white p-1">
        {fullOptions.map((option, index) => (
          <div
            key={index}
            className={`text-m-medium h-full px-3 py-[6px] ${
              selectedOption.value === option.value ? "text-m-semibold rounded-md bg-primary-50 text-primary-500" : "text-gray-500"
            } outline-none`}
            onClick={() => setSelectedOption(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterTableStatus;
