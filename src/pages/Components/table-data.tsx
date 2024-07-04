import { DataType } from "@/components/table/PrimaryTable";
import type { TableColumnsType } from "antd";
import { Tooltip } from "antd";
import { IoEyeOutline, IoTrashBinOutline } from "react-icons/io5";
import { PiNotePencilLight } from "react-icons/pi";

const ActionButtons: React.FC<{ record: DataType }> = () => (
  <div className="flex gap-3 cursor-pointer">
    <Tooltip title="View">
      <IoEyeOutline className="text-[18px] text-blue-500" />
    </Tooltip>
    <Tooltip title="Edit">
      <PiNotePencilLight className="text-[18px] text-yellow-600" />
    </Tooltip>
    <Tooltip title="Delete">
      <IoTrashBinOutline className="text-[18px] text-red-500" />
    </Tooltip>
  </div>
);
export const tableColumns: TableColumnsType<DataType> = [
  {
    title: "Product",
    dataIndex: "product",
    sorter: (a, b) => String(a.product).localeCompare(String(b.product))
  },
  {
    title: "SKU",
    dataIndex: "sku",
    sorter: (a, b) => Number(a.sku) - Number(b.sku),
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    sorter: (a, b) => Number(a.stock) - Number(b.stock),
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => Number(a.price) - Number(b.price),
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => String(a.status).localeCompare(String(b.status))
  },
  {
    title: "Added",
    dataIndex: "added",
    sorter: (a, b) => String(a.added).localeCompare(String(b.added))
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (record) => <ActionButtons record={record} />,
  },
];

export const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  newSelectedRowKeys;
};

export const tableData: DataType[] = [
  {
    key: 1,
    product: "abc",
    sku: 1,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-01-01",
  },
  {
    key: 2,
    product: "123",
    sku: 2,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 3,
    product: "345",
    sku: 3,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 4,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 5,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 6,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 7,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 24,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 134,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 12324,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 1231234,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 421312,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 421312,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 4323,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 4,
    product: "zzzz",
    sku: 1,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 213123124,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 4213123123,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 432321,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
  {
    key: 1232114,
    product: "zzzz",
    sku: 4,
    category: "Watch",
    stock: 10,
    price: 100,
    status: "Success",
    added: "2024-02-01",
  },
];
