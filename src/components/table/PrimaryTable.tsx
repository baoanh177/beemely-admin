import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import FilterTableStatus from "./FilterTableStatus";
import FormInput from "../form/FormInput";
import { IoSearchOutline } from "react-icons/io5";
import DateRangePicker from "../form/FormDateRangePicker";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ISearchParams } from "@/shared/utils/shared-interfaces";
import { useDispatch } from "react-redux";

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
  pagination?: { pageSize: number; current: number; total: number; showSideChanger?: boolean };
}

const PrimaryTable: React.FC<IPrimaryTableProps> = ({ search, columns, data, pagination, setFilter }) => {
  const dispatch = useDispatch();
  const getShowingText = (total: number, range: [number, number]) => {
    return `Showing ${range[0]}-${range[1]} from ${total}`;
  };

  return (
    <div className="primary-table flex w-full flex-col gap-6">
      {search && (
        <div className="flex justify-between">
          <FilterTableStatus options={search.status} />
          <div className="flex gap-4">
            <FormInput icon={IoSearchOutline} placeholder="Search product. . ." type="text" />
            <DateRangePicker />
          </div>
        </div>
      )}
      <Table
        onChange={(newPagination) => {
          dispatch(
            setFilter({
              page: newPagination.current,
              size: newPagination.pageSize,
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
                showSizeChanger: pagination.showSideChanger ?? false,
              }
            : false
        }
        className="shadow-[0px_4px_30px_0px_rgba(46,45,116,0.05)]"
      />
    </div>
  );
};

export default PrimaryTable;
