import imgZaloPay from "@/assets/images/ZaloPayLogo.png";
import imgVnPay from "@/assets/images/vnpay.webp";
import StatusBadge from "@/components/common/StatusBadge";
import { AppDispatch } from "@/services/store";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { Avatar, Image } from "antd";
import { NavigateFunction } from "react-router-dom";

export const tableColumns: any = [
  {
    title: "Mã đơn hàng",
    dataIndex: "key",
  },
  {
    title: "Người đặt",
    dataIndex: "user",
    render: (user: any) => (
      <div className="flex flex-row items-center justify-center gap-2">
        <Avatar src={user.avatarUrl} />
        <span className="flex items-center justify-center">{user.fullName}</span>
      </div>
    ),
  },
  {
    title: "Tổng tiền",
    dataIndex: "totalPrice",
    render: (price: number) => <span>{price.toLocaleString()} VND</span>,
  },
  {
    title: "Địa chỉ giao hàng",
    dataIndex: "shippingAddress",
  },
  {
    title: "Phương thức giao hàng",
    dataIndex: "paymentType",
    render: (paymentType: string) => (
      <>
        {paymentType === "zalopay" ? (
          <Image width={90} height={30} preview={false} src={imgZaloPay} />
        ) : (
          <Image width={90} height={20} preview={false} src={imgVnPay} />
        )}{" "}
      </>
    ),
  },
  {
    title: "Trạng thái đơn hàng",
    dataIndex: "orderStatus",
    render: (status: string) => (
      <>
        {status === "pending" ? (
          <StatusBadge text={"Đang chờ"} color="yellow" />
        ) : status === "success" ? (
          <StatusBadge text={"Đã hoàn thành"} color="green-capital" />
        ) : status === "cancelled" ? (
          <StatusBadge text={"Đã hủy"} color="red" />
        ) : status === "processing" ? (
          <StatusBadge text={" Đang tiến hành"} color="red" />
        ) : status === "shipped" ? (
          <StatusBadge text={"Đang giao hàng"} color="red" />
        ) : (
          <StatusBadge text={" Đã giao thành công"} color="red" />
        )}{" "}
      </>
    ),
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "createdAt",
  },
];

export const getGridButtons = (dispatch: AppDispatch, navigate: NavigateFunction): IGridButton[] => {
  return [
    {
      type: EButtonTypes.VIEW,
      onClick(record) {
        navigate(`/orders/details/${record.key}`);
      },
      permission: EPermissions.READ_ACCOUNT,
    },
  ];
};
