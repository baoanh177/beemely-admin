import React, { useMemo, useState, useEffect, useRef } from "react";

export interface IFilterTableStatusOptions {
  value: string;
  label: string;
}

export interface IFilterTableStatusProps {
  options: IFilterTableStatusOptions[];
  onChange?: (selectedOption: IFilterTableStatusOptions) => void;
  name?: string;
}

const FilterTableStatus: React.FC<IFilterTableStatusProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<IFilterTableStatusOptions>({ value: "", label: "Tất cả" });
  const fullOptions = useMemo(() => [{ value: "", label: "Tất cả" }, ...options], [options]);

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOption);
    }
  }, [JSON.stringify(selectedOption)]);

  const handleClick = (option: IFilterTableStatusOptions, index: number) => {
    if (selectedOption.value !== option.value) {
      setSelectedOption(option);
      if (tabRefs.current[index]) {
        tabRefs.current[index]!.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  return (
    <div>
      <div
        className="flex max-w-5xl cursor-pointer items-center overflow-x-auto rounded-lg bg-white p-1"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {fullOptions.map((option, index) => (
          <div
            ref={(el) => (tabRefs.current[index] = el)}
            key={index}
            className={`text-m-medium tho-status h-full shrink-0 px-3 py-[6px] ${
              selectedOption.value === option.value ? "text-m-semibold rounded-md bg-primary-50 text-primary-500" : "text-gray-500"
            } outline-none`}
            onClick={() => handleClick(option, index)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterTableStatus;
