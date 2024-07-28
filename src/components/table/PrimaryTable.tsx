import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ISearchParams } from "@/shared/utils/shared-interfaces";
import { useDispatch } from "react-redux";
import PaginationText from "../common/PaginationText";
import PrimaryTableSkeleton from "../skeleton/PrimaryTableSkeleton";
import AdvancedSearch, { IAdvancedSearchProp } from "../search/AdvancedSearch";

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
  pagination?: { pageSize: number; current: number; total: number; showSideChanger?: boolean };
}

const PrimaryTable: React.FC<IPrimaryTableProps> = ({ search, columns, data, pagination, isTableLoading, setFilter }) => {
  const dispatch = useDispatch();
  const dataSearch: IAdvancedSearchProp = {
    normal: [
      {
        label: "haha",
        value: "haha"
      }
    ],
    advanced: [

      {
        type: "text",
        name: "123",

      },
      {
        type: "check",
        name: "1222223",
      },
      {
        type: "date",
        name: "12223"
      },
      {
        type: 'status',
        options: [{ label: "InActive", value: "inactive" }],
        name: "ads"
      }
    ]
  }
  return (
    <div className="primary-table flex w-full flex-col gap-6">
      {search && (
        <AdvancedSearch advanced={dataSearch.advanced} normal={dataSearch.normal} />
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
          dataSource={data}
          pagination={
            pagination
              ? {
                ...pagination,
                showTotal: PaginationText,
                showSizeChanger: pagination.showSideChanger ?? false,
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
