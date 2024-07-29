import { useState } from "react";
import { Input, Select, DatePicker, Switch, Checkbox, Button } from "antd";
import { IoSearchOutline, IoClose } from "react-icons/io5";

const { RangePicker } = DatePicker;
interface ISearch {
  onSearch: (filter: any) => void;
}
const AdvancedSearch = ({ onSearch }: ISearch) => {
  const [filters, setFilters] = useState<any>({});

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({});
    onSearch({});
  };

  return (
    <div className="advanced-search">
      <div className="flex gap-4">
        <Input placeholder="Tìm kiếm theo tên" onChange={(e) => handleFilterChange("name", e.target.value)} prefix={<IoSearchOutline />} />
        <Input
          placeholder="Tìm kiếm theo giá"
          type="number"
          onChange={(e) => handleFilterChange("price", e.target.value)}
          prefix={<IoSearchOutline />}
        />
        <Select placeholder="Chọn trạng thái" onChange={(value) => handleFilterChange("status", value)}>
          <Select.Option value="all">All Status</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
          <Select.Option value="shipped">Shipped</Select.Option>
          <Select.Option value="delivered">Delivered</Select.Option>
          <Select.Option value="cancelled">Cancelled</Select.Option>
        </Select>
        <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => handleFilterChange("isActive", checked)} />
        <Checkbox onChange={(e) => handleFilterChange("isChecked", e.target.checked)}>Checked</Checkbox>
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
