import { ISearchParams } from "@/shared/utils/shared-interfaces";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { BiSliderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import StatusBadge from "../common/StatusBadge";
import AdvancedSearchSecondary from "../search/AdvancedSearchSecondary";
import { DefaultSearch, IDefaultSearchProps } from "../search/DefaultSearch";
import PrimaryTableSkeleton from "../skeleton/PrimaryTableSkeleton";
import ImageTable from "./ImageTable";
import { IAdvancedSearch } from "./PrimaryTable";
interface StatusType {
  text: string;
  color: "blue" | "green" | "orange" | "gray" | "red";
}
interface DataType {
  key: string;
  total: number;
  date: string;
  status: StatusType;
  productImageSrc?: string;
  productTitle: string;
  productDescription?: string;
}
export interface ITableData {
  key: React.Key;
  [key: string]: unknown;
}
interface SecondaryTableProps {
  title?: string;
  data: DataType[];
  columns: ColumnsType<DataType>;
  hideComponents?: string[];
  paginationConfig?: {
    pageSize: number;
    current?: number;
    total?: number;
  };
  search?: IDefaultSearchProps | false;
  setFilter: ActionCreatorWithPayload<ISearchParams>;
  pagination?: { pageSize: number; current: number; total: number; showSideChanger?: boolean };
  advancedSearch?: IAdvancedSearch;
  isTableLoading?: boolean;
}
export const columns: ColumnsType<DataType> = [
  {
    title: "Order ID",
    dataIndex: "key",
    key: "key",
    render: (text: string) => <a className="text-m-semibold text-primary-500">{text}</a>,
  },
  {
    title: "Product",
    dataIndex: "productImageSrc",
    key: "productImageSrc",
    render: (productImageSrc: string, record: DataType) => (
      <ImageTable imageSrc={productImageSrc} title={record.productTitle} description={record.productDescription} />
    ),
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    sorter: (a: DataType, b: DataType) => a.total - b.total,
    render: (total: number) => <span className="text-m-medium text-gray-500">${total.toFixed(2)}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: (a: DataType, b: DataType) => a.status.text.localeCompare(b.status.text),
    render: (status: { text: string; color: "blue" | "green" | "orange" | "gray" | "red" }) => (
      <StatusBadge text={status.text} color={status.color} />
    ),
  },
  {
    title: "Date",
    key: "date",
    render: (record: DataType) => (
      <Space size="middle">
        <span className="text-m-medium text-gray-500">{record.date}</span>
      </Space>
    ),
  },
];
export const data: DataType[] = [
  {
    key: "302002",
    total: 590.0,
    date: "12 Dec 2023",
    status: { text: "Delivered", color: "green" },
    productImageSrc: "https://picsum.photos/200/300",
    productTitle: "Product Title",
    productDescription: "Product Description",
  },
  {
    key: "302003",
    total: 590.0,
    date: "12 Dec 2023",
    status: { text: "Cancelled", color: "red" },
    productImageSrc: "",
    productTitle: "Product Title",
    productDescription: "Product Description",
  },
];

const SecondaryTable: React.FC<SecondaryTableProps> = ({
  advancedSearch = [],
  search,
  setFilter,
  title,
  data,
  hideComponents,
  paginationConfig,
  isTableLoading,
  columns,
}) => {
  const dispatch = useDispatch();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const advancedSearchRef = useRef<HTMLDivElement>(null);

  return (
    <div className="secondary-table">
      {!hideComponents?.includes("transactionHeader") && (
        <div className="gap-3 rounded-xl bg-white px-6 py-4">
          <div className="display-s-semibold text-black-500">{title}</div>
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
              <div
                ref={advancedSearchRef}
                className="transition-max-height overflow-hidden duration-300 ease-in-out"
                style={{ maxHeight: showAdvancedSearch ? `${advancedSearchRef.current?.scrollHeight}px` : "0px" }}
              >
                {!!advancedSearch.length && <AdvancedSearchSecondary advanced={advancedSearch} />}
              </div>
            </div>
          )}
        </div>
      )}
      {!isTableLoading ? (
        <Table
          onChange={(newPagination) => {
            dispatch(
              setFilter({
                _page: newPagination.current,
                _limit: newPagination.pageSize,
              }),
            );
          }}
          columns={columns}
          dataSource={data}
          pagination={!hideComponents?.includes("pagination") ? paginationConfig : false}
        />
      ) : (
        <PrimaryTableSkeleton />
      )}
    </div>
  );
};

export default SecondaryTable;
