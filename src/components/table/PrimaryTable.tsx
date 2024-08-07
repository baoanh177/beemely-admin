import React, { useState, useRef } from "react";
import { ConfigProvider, Table } from "antd";
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

export interface TextNumberField extends IFormInputProps {
  type: "text" | "number";
}
export interface DateField extends DateRangePickerProps {
  type: "date";
}
export interface StatusField extends IFilterTableStatusProps {
  type: "status";
}
export interface SwitchField extends IFormSwitchProps {
  type: "switch";
}
export interface CheckField extends FormCheckProps {
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

const PrimaryTable: React.FC<IPrimaryTableProps> = ({
  advancedSearch = [],
  search,
  columns,
  data,
  pagination,
  isTableLoading,
  setFilter
}) => {
  const dispatch = useDispatch();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const advancedSearchRef = useRef<HTMLDivElement>(null);

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            colorBgTextHover: "#F4ECFB"
          },
        },
      }}
    >
      <div className="primary-table flex w-full flex-col gap-6">
        {search && (
          <div>
            <div className="flex gap-4">
              <DefaultSearch {...search} />
              {!!advancedSearch.length && (
                <div
                  className={clsx(
                    "flex h-10 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg text-lg transition-colors",
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
            <div
              ref={advancedSearchRef}
              className="transition-max-height overflow-hidden duration-300 ease-in-out"
              style={{ maxHeight: showAdvancedSearch ? `${advancedSearchRef.current?.scrollHeight}px` : "0px" }}
            >
              {!!advancedSearch.length && <AdvancedSearch advanced={advancedSearch} />}
            </div>
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
    </ConfigProvider>
  );
};

export default PrimaryTable;