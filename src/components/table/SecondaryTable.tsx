import React, { useState, useEffect } from "react";
import { Space, Table } from "antd";
import StatusBadge from "../common/StatusBadge";
import ImageTable from "./ImageTable";
import FormInput from "../form/FormInput";
import { IoSearchOutline, IoFilterOutline } from "react-icons/io5";
import { ColumnsType } from "antd/es/table";
import { ConfigProvider, Button } from "antd";
import AdvancedSearch from "../form/AdvancedSearch";

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
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<DataType[]>(data);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const filters = [
    {
      type: "input",
      label: "Tìm kiếm theo tên",
      placeholder: "Nhập tên",
      key: "productTitle",
    },
    {
      type: "input",
      label: "Tìm kiếm theo giá",
      placeholder: "Nhập giá",
      key: "total",
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

  const handleSearch = (filters: Record<string, any>) => {
    let filtered = data;

    if (filters.productTitle) {
      filtered = filtered.filter((item) => item.productTitle.toLowerCase().includes(filters.productTitle.toLowerCase()));
    }
    setFilteredData(filtered);
    // console.log(filters);
  };

  const handleBasicSearch = (value: string | number) => {
    setSearchValue(value as string);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          colorPrimaryHover: "#40a9ff",
        },
      }}
    >
      <div className="secondary-table">
        {!hideComponents?.includes("transactionHeader") && (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-white px-6 py-[18px]">
            <div className="display-s-semibold text-black-500">{title}</div>
            <div className="flex gap-3">
              <FormInput icon={IoSearchOutline} placeholder="Tìm kiếm. . ." type="text" value={searchValue} onChange={handleBasicSearch} />
              <Button className="h-[38px] w-[70px]" icon={<IoFilterOutline />} onClick={() => setShowAdvancedSearch(!showAdvancedSearch)} />
            </div>
          </div>
        )}
        {showAdvancedSearch && <AdvancedSearch onSearch={handleSearch} filters={filters} />}
        <Table columns={columns} dataSource={filteredData} pagination={!hideComponents?.includes("pagination") ? paginationConfig : false} />
      </div>
    </ConfigProvider>
  );
};

export default SecondaryTable;
