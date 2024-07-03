import type { TableColumnsType } from "antd";
import { Modal, Tooltip } from "antd";
import { IoEyeOutline, IoTrashBinOutline } from "react-icons/io5";
import { PiNotePencilLight } from "react-icons/pi";
const { confirm } = Modal;

interface DataType {
  key: React.Key;
  product: string;
  sku: number;
  category: string;
  stock: number;
  price: number;
  status: string;
  added: string;
}
const showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure you want to delete this item?',
    content: 'This action cannot be undone.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
  });
};
const actionButtonsConfig = [
  {
    icon: <IoEyeOutline className='text-[18px] text-blue-500' />,
    tooltip: 'View',
    onClick: (record: DataType) => {
      record
    },
  },
  {
    icon: <PiNotePencilLight className='text-[18px] text-yellow-600' />,
    tooltip: 'Edit',
    onClick: (record: DataType) => {
      record
    },
  },
  {
    icon: <IoTrashBinOutline className='text-[18px] text-red-500' />,
    tooltip: 'Delete',
    onClick: (record: DataType) => {
      showDeleteConfirm();
      record
    },
  },
];

const ActionButtons: React.FC<{ record: DataType }> = ({ record }) => (
  <div className='flex gap-3 hover:cursor-pointer'>
    {actionButtonsConfig.map((button, index) => (
      <Tooltip key={index} title={button.tooltip}>
        <span onClick={() => button.onClick(record)}>
          {button.icon}
        </span>
      </Tooltip>
    ))}
  </div>
);

export const tableColumns: TableColumnsType<DataType> = [
  {
    title: "Product",
    dataIndex: "product",
    sorter: (a, b) => a.product.localeCompare(b.product),
  },
  {
    title: "SKU",
    dataIndex: "sku",
    sorter: (a, b) => a.sku - b.sku,
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    sorter: (a, b) => a.stock - b.stock,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.sku - b.sku,
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.product.localeCompare(b.product),
  },
  {
    title: "Added",
    dataIndex: "added",
    sorter: (a, b) => a.added.localeCompare(b.added),
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
];
