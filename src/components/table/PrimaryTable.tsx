import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import FilterTableStatus from "./FilterTableStatus";
import FormInput from "../form/FormInput";
import FormDate from "../form/FormDate";
import { IoSearchOutline } from "react-icons/io5";
import DateRangePicker from "../form/InputRangePicker";

export interface ITableData {
  key: React.Key;
  [key: string]: unknown;
}

export interface ISearchTable {
  status: { value: string; label: string }[];
}
interface IPrimaryTableProps {
  search?: ISearchTable | false;
  columns: ColumnsType;
  data: ITableData[];
  pagination?: { pageSize: number; current: number; total: number };
}

const PrimaryTable: React.FC<IPrimaryTableProps> = ({ search, columns, data, pagination }) => {
  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: ITableData[]) => {
    selectedRowKeys;
    selectedRows;
  };

  return (
    <div className="flex flex-col gap-6">
      {search && (
        <div className="flex justify-between">
          <FilterTableStatus options={search.status} />
          <div className="flex gap-4">
            <FormInput icon={IoSearchOutline} placeholder="Search product. . ." type="text" />
            <DateRangePicker />
          </div>
        </div>
      )}
      <Table rowSelection={{ onChange: onSelectChange }} columns={columns} dataSource={data} pagination={pagination && pagination} />
    </div>
  );
};

export default PrimaryTable;
