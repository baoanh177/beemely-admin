import React from "react";
import { Space, Table } from "antd";
import StatusBadge from "../StatusBadge";
import ImageTable from "./ImageTable";
import FormInput from "../form/FormInput";
import FormDate from "../form/FormDate";
import { IoSearchOutline } from "react-icons/io5";
import { ColumnsType } from "antd/es/table";
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

interface SecondaryTableProps {
  title: string;
  data: DataType[];
  columns: ColumnsType<DataType>;
  hideComponents?: string[];
  paginationConfig?: {
    pageSize: number;
    current?: number;
    total?: number;
  };
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

const SecondaryTable: React.FC<SecondaryTableProps> = ({ title, data, hideComponents, paginationConfig, columns }) => {
  return (
    <div className="secondary-table">
      {!hideComponents?.includes("transactionHeader") && (
        <div className="flex items-center justify-between gap-3 px-6 py-[18px]">
          <div className="display-s-semibold text-black-500">{title}</div>
          <div className="flex gap-3">
            <FormInput icon={IoSearchOutline} placeholder="Search product. . ." type="text" />
            <FormDate />
          </div>
        </div>
      )}
      <Table columns={columns} dataSource={data} pagination={!hideComponents?.includes("pagination") ? paginationConfig : false} />
    </div>
  );
};

export default SecondaryTable;
