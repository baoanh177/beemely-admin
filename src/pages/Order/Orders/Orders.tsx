import Heading from "@/layouts/Default/Heading";
import { GoDownload } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import ManagementGrid from "@/components/grid/ManagementGrid";
import { ColumnsType } from "antd/es/table";
import ImageTable from "@/components/table/ImageTable";
import { ITableData } from "@/components/table/PrimaryTable";
import { ReactNode } from "react";
import StatusBadge from "@/components/StatusBadge";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ButtonTypes } from "@/shared/enums/button";
import { Permissions } from "@/shared/enums/permissions";

interface IOrder extends ITableData {
  orderId: number;
  product: ReactNode;
  date: string;
  customer: string;
  total: string;
  payment: string;
  status: ReactNode;
}

const Orders = () => {
  const data: IOrder[] = [
    {
      key: "1",
      orderId: 302012,
      product: (
        <ImageTable
          title="Handmade Pouch"
          description="+3 Products"
          imageSrc="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/163d9f52-ede6-483a-acff-558b40d89cac/
          alphafly-3-blueprint-road-racing-shoes-QrjGRL.png"
        />
      ),
      date: "29 Dec 2022",
      customer: "John Bushmill",
      total: "$121.00",
      payment: "Mastercard",
      status: <StatusBadge color="orange" text="Processing" />,
    },
  ];

  const columns: ColumnsType<IOrder> = [
    {
      key: "1",
      title: "Order ID",
      dataIndex: "orderId",
    },
    {
      key: "2",
      title: "Product",
      dataIndex: "product",
    },
    {
      key: "3",
      title: "Date",
      dataIndex: "date",
    },
    {
      key: "4",
      title: "Customer",
      dataIndex: "customer",
    },
    {
      key: "5",
      title: "Total",
      dataIndex: "total",
    },
    {
      key: "6",
      title: "Payment",
      dataIndex: "payment",
    },
    {
      key: "7",
      title: "Status",
      dataIndex: "status",
    },
  ];

  const buttons: IGridButton[] = [
    {
      type: ButtonTypes.CREATE,
      onClick() {},
      permission: Permissions.CREATE_ORDER,
    },
    {
      type: ButtonTypes.VIEW,
      onClick() {},
      permission: Permissions.READ_ORDER,
    },
    {
      type: ButtonTypes.UPDATE,
      onClick() {
      },
      permission: Permissions.UPDATE_ORDER,
    },
    {
      type: ButtonTypes.DELETE,
      onClick() {},
      permission: Permissions.DELETE_ORDER,
    },
  ];
  return (
    <>
      <Heading
        title="Orders"
        hasBreadcrumb
        buttons={[
          {
            text: "Export",
            type: "ghost",
            icon: <GoDownload className="text-[18px]" />,
            permission: Permissions.READ_ORDER,
          },
          {
            text: "Add Order",
            icon: <FaPlus className="text-[18px]" />,
            permission: Permissions.CREATE_ORDER,
          },
        ]}
      />

      <ManagementGrid
        columns={columns}
        buttons={buttons}
        data={data}
        search={{
          status: [
            { value: "processing", label: "Processing" },
            { value: "shipped", label: "Shipped" },
            { value: "delivered", label: "Delivered" },
            { value: "cancelled", label: "Cancelled" },
          ],
        }}
      />
    </>
  );
};

export default Orders;
