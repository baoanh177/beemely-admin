import React, { useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import FilterTableStatus from "./FilterTableStatus";
import FormInput from "../form/FormInput";
import { IoSearchOutline, IoFilterOutline } from "react-icons/io5";
import DateRangePicker from "../form/FormDateRangePicker";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ISearchParams } from "@/shared/utils/shared-interfaces";
import { useDispatch } from "react-redux";
import AdvancedSearch from "../form/AdvancedSearch";

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
  setFilter: ActionCreatorWithPayload<ISearchParams>;
  pagination?: { pageSize: number; current: number; total: number; showSizeChanger?: boolean };
}

const PrimaryTable: React.FC<IPrimaryTableProps> = ({ search, columns, data, pagination, setFilter }) => {
  const dispatch = useDispatch();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (filters: any) => {
    dispatch(setFilter(filters));
  };

  const handleBasicSearch = (e: any) => {
    setSearchValue(e.target.value);
    handleSearch({ search: e.target.value });
  };

  const getShowingText = (total: number, range: [number, number]) => {
    return `Hiển thị ${range[0]}-${range[1]} từ ${total}`;
  };

  return (
    <div className="primary-table flex w-full flex-col gap-6">
      {search && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <FilterTableStatus options={search.status} />
            <div className="flex gap-4">
              <FormInput icon={IoSearchOutline} placeholder="Tìm kiếm..." type="text" value={searchValue} onChange={handleBasicSearch} />
              <DateRangePicker />
              <Button icon={<IoFilterOutline />} onClick={() => setShowAdvancedSearch(!showAdvancedSearch)} />
            </div>
          </div>
          {showAdvancedSearch && <AdvancedSearch onSearch={handleSearch} />}
        </div>
      )}
      <Table
        onChange={(newPagination) => {
          dispatch(
            setFilter({
              _page: newPagination.current,
              _size: newPagination.pageSize,
            }),
          );
        }}
        columns={columns}
        dataSource={data}
        pagination={
          pagination
            ? {
                ...pagination,
                showTotal: getShowingText,
                showSizeChanger: pagination.showSizeChanger ?? false,
              }
            : false
        }
        className="shadow-[0px_4px_30px_0px_rgba(46,45,116,0.05)]"
      />
    </div>
  );
};

export default PrimaryTable;
