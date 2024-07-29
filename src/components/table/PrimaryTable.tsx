import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import FilterTableStatus from "./FilterTableStatus";
import FormInput from "../form/FormInput";
import { IoSearchOutline, IoFilterOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import AdvancedSearch from "../form/AdvancedSearch";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ISearchParams } from "@/shared/utils/shared-interfaces";
import PrimaryTableSkeleton from "../skeleton/PrimaryTableSkeleton";
import PaginationText from "../common/PaginationText";

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
  isTableLoading?: boolean;
  setFilter: ActionCreatorWithPayload<ISearchParams>;
  pagination?: { pageSize: number; current: number; total: number; showSizeChanger?: boolean };
}

const PrimaryTable: React.FC<IPrimaryTableProps> = ({ search, columns, data, pagination, isTableLoading, setFilter }) => {
  const dispatch = useDispatch();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ITableData[]>(data);

  const filters = [
    {
      type: "input",
      label: "Tìm kiếm theo tên",
      placeholder: "Nhập tên",
      key: "name",
    },
    {
      type: "input",
      label: "Tìm kiếm theo giá",
      placeholder: "Nhập giá",
      key: "price",
      inputType: "number",
    },
    {
      type: "select",
      label: "Chọn trạng thái",
      placeholder: "Chọn trạng thái",
      key: "status",
      options: [
        { value: "all", label: "All Status" },
        { value: "processing", label: "Processing" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
    {
      type: "switch",
      label: "Active",
      key: "isActive",
    },
    {
      type: "date",
      label: "Ngày",
      key: "date",
    },
    {
      type: "checkbox",
      label: "Checked",
      key: "checked",
    },
  ];

  useEffect(() => {
    if (searchValue) {
      const filtered = data.filter((item) => Object.values(item).some((val) => String(val).toLowerCase().includes(searchValue.toLowerCase())));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchValue, data]);

  const handleSearch = (filters: any) => {
    // console.log("Filters:", filters);
    dispatch(setFilter(filters));
  };

  const handleBasicSearch = (value: string | number) => {
    setSearchValue(value as string);
    handleSearch({ search: value });
  };

  return (
    <div className="primary-table flex w-full flex-col gap-6">
      {search && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <FilterTableStatus options={search.status} />
            <div className="flex gap-4">
              <FormInput icon={IoSearchOutline} placeholder="Tìm kiếm..." type="text" value={searchValue} onChange={handleBasicSearch} />
              <Button className="h-[38px]" icon={<IoFilterOutline />} onClick={() => setShowAdvancedSearch(!showAdvancedSearch)} />
            </div>
          </div>
          {showAdvancedSearch && <AdvancedSearch onSearch={handleSearch} filters={filters} />}
        </div>
      )}
      {!isTableLoading ? (
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
          dataSource={filteredData}
          pagination={
            pagination
              ? {
                  ...pagination,
                  showTotal: PaginationText,
                  showSizeChanger: pagination.showSizeChanger ?? false,
                }
              : false
          }
          className="shadow-[0px_4px_30px_0px_rgba(46,45,116,0.05)]"
        />
      ) : (
        <PrimaryTableSkeleton />
      )}
    </div>
  );
};

export default PrimaryTable;
