import { useState } from "react";
import { Button } from "antd";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormSwitch from "./FormSwitch";
import FormCheck from "./FormCheck";
import DateRangePicker from "./FormDateRangePicker";
import dayjs from "dayjs";

interface ISearch {
  filters: any[];
  onSearch: (filter: any) => void;
}

const AdvancedSearch = ({ filters, onSearch }: ISearch) => {
  const [filterValues, setFilterValues] = useState<any>({});

  const handleFilterChange = (key: string, value: any) => {
    if (key === "date" && Array.isArray(value)) {
      const dateStrings = value.map((date) => (date ? date.toISOString() : null));
      setFilterValues((prevFilters: Record<string, any>) => ({ ...prevFilters, [key]: dateStrings }));
    } else {
      setFilterValues((prevFilters: Record<string, any>) => ({ ...prevFilters, [key]: value }));
    }
  };

  const handleSearch = () => {
    onSearch(filterValues);
  };

  const handleClear = () => {
    setFilterValues({});
    onSearch({});
  };

  return (
    <div className="advanced-search p-2">
      <div className="flex items-center gap-4">
        {filters.map((filter) => {
          switch (filter.type) {
            case "input":
              return (
                <FormInput
                  key={filter.key}
                  label={filter.label}
                  placeholder={filter.placeholder}
                  type={filter.inputType || "text"}
                  value={filterValues[filter.key] || ""}
                  onChange={(value) => handleFilterChange(filter.key, value)}
                />
              );
            case "select":
              return (
                <FormSelect
                  key={filter.key}
                  label={filter.label}
                  placeholder={filter.placeholder}
                  options={filter.options}
                  value={filterValues[filter.key] || ""}
                  onChange={(value) => handleFilterChange(filter.key, value)}
                />
              );
            case "switch":
              return (
                <FormSwitch
                  key={filter.key}
                  label={filter.label}
                  checkedText="Active"
                  uncheckedText="Inactive"
                  onChange={(checked) => handleFilterChange(filter.key, checked)}
                />
              );
            case "date":
              return (
                <DateRangePicker
                  key={filter.key}
                  label={filter.label}
                  value={
                    filterValues[filter.key]
                      ? filterValues[filter.key].map((dateString: string) => (dateString ? dayjs(dateString) : null))
                      : [null, null]
                  }
                  onChange={(dates) => handleFilterChange(filter.key, dates)}
                />
              );
            case "checkbox":
              return <FormCheck key={filter.key} label={filter.label} onChange={(checked) => handleFilterChange(filter.key, checked)} />;
            default:
              return null;
          }
        })}
      </div>
      <div className="mt-4 flex gap-4">
        <Button type="primary" onClick={handleSearch}>
          <IoSearchOutline /> Search
        </Button>
        <Button onClick={handleClear}>
          <IoClose /> Clear
        </Button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
