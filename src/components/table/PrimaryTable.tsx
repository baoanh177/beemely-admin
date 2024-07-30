import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ISearchParams } from "@/shared/utils/shared-interfaces";
import { useDispatch } from "react-redux";
import PaginationText from "../common/PaginationText";
import PrimaryTableSkeleton from "../skeleton/PrimaryTableSkeleton";
import AdvancedSearch from "../search/AdvancedSearch";
import { DefaultSearch, IDefaultSearchProps } from "../search/DefaultSearch";
import { IFilterTableStatusOptions, IFilterTableStatusProps } from "./FilterTableStatus";
import { IFormInputProps } from "../form/FormInput";
import { DateRangePickerProps } from "../form/FormDateRangePicker";
import { IFormSwitchProps } from "../form/FormSwitch";
import { FormCheckProps } from "../form/FormCheck";
import { BiSliderAlt } from "react-icons/bi";
import clsx from "clsx";

export interface ITableData {
  key: React.Key;
  [key: string]: unknown;
}

interface TextNumberField extends IFormInputProps {
  type: "text" | "number";
}
interface DateField extends DateRangePickerProps {
  type: "date";
}
interface StatusField extends IFilterTableStatusProps {
  type: "status";
}
interface SwitchField extends IFormSwitchProps {
  type: "switch";
}
interface CheckField extends FormCheckProps {
  type: "check";
}

export type IAdvancedSearch = Array<TextNumberField | DateField | StatusField | SwitchField | CheckField>;
export interface ISearchTable {
  status: { value: string; label: string }[];
}

interface IPrimaryTableProps {
  search?: IDefaultSearchProps | false;
  columns: ColumnsType;
  data: ITableData[];
  isTableLoading?: boolean;
  setFilter: ActionCreatorWithPayload<ISearchParams>;
  pagination?: { pageSize: number; current: number; total: number; showSizeChanger?: boolean };
  advancedSearch?: IAdvancedSearch;
  defaultSearchProps?: IFilterTableStatusOptions;
}

const PrimaryTable: React.FC<IPrimaryTableProps> = ({ advancedSearch = [], search, columns, data, pagination, isTableLoading, setFilter }) => {
  const dispatch = useDispatch();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  return (
    <div className="primary-table flex w-full flex-col gap-6">
      {search && (
        <div>
          <div className="flex gap-4">
            <DefaultSearch {...search} />
            {!!advancedSearch.length && (
              <div
                className={clsx(
                  "flex h-[40px] w-[48px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-lg",
                  showAdvancedSearch
                    ? "border border-primary-500 bg-primary-50 text-primary-500"
                    : "border border-gray-100 bg-white text-gray-400",
                )}
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                <BiSliderAlt />
              </div>
            )}
          </div>
          {showAdvancedSearch && !!advancedSearch.length && <AdvancedSearch advanced={advancedSearch} />}
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
          dataSource={data}
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
