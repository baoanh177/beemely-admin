import { ISearchParams } from "@/shared/utils/shared-interfaces";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useDispatch } from "react-redux";
import StatusBadge from "../common/StatusBadge";
import { IAdvancedSearchProps } from "../search/AdvancedSearch";
import AdvancedSearchSecondary from "../search/AdvancedSearchSecondary";
import PrimaryTableSkeleton from "../skeleton/PrimaryTableSkeleton";
import ImageTable from "./ImageTable";
import { ISearchTable } from "./PrimaryTable";
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
  search?: ISearchTable | false;
  setFilter: ActionCreatorWithPayload<ISearchParams>;
  pagination?: { pageSize: number; current: number; total: number; showSideChanger?: boolean };
  advancedSearch?: IAdvancedSearchProps;
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
export const dataSearch: IAdvancedSearchProps = {
  advanced: [
    {
      type: "date",
      name: "12343",
    },
    {
      type: "text",
      name: "12342",
      placeholder: "Search orders. . .",
    },
    {
      type: "text",
      name: "1235",
      placeholder: "Search orders. . .",
    },

    {
      type: "status",
      options: [
        { label: "Processing", value: "processing" },
        { label: "Shiped", value: "shiped" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
      ],
      name: "ads",
    },
  ],
};
const SecondaryTable: React.FC<SecondaryTableProps> = ({
  advancedSearch,
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
  return (
    <div className="secondary-table">
      {!hideComponents?.includes("transactionHeader") && (
        <div className="gap-3 rounded-xl bg-white px-6 py-4">
          <div className="display-s-semibold text-black-500">{title}</div>
          {search && advancedSearch && <AdvancedSearchSecondary advanced={advancedSearch.advanced} normal={advancedSearch.normal} />}
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
          pagination={!hideComponents?.includes("pagination") ? paginationConfig : false}
        />
      ) : (
        <PrimaryTableSkeleton />
      )}
    </div>
  );
};

export default SecondaryTable;
