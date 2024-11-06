import imgZaloPay from "@/assets/images/ZaloPayLogo.png";
import imgVnPay from "@/assets/images/vnpay.webp";
import StatusBadge from "@/components/common/StatusBadge";
import { AppDispatch } from "@/services/store";
import { updateOrder } from "@/services/store/order/order.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { Avatar, Image, Select } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { NavigateFunction } from "react-router-dom";

const { Option } = Select;

const orderStatusOptions = [
  { value: "pending", label: "Chờ xác nhận", color: "yellow" },
  { value: "processing", label: "Đang chuẩn bị hàng", color: "blue" },
  { value: "shipped", label: "Đang giao hàng", color: "black" },
  { value: "delivered", label: "Giao hàng thành công", color: "green" },
  { value: "success", label: "Nhận hàng thành công", color: "green-capital" },
  { value: "cancelled", label: "Hủy đơn", color: "red" },
];
export const getTableColumns: any = (dispatch: any) => {
  return [
    {
      title: "Mã đơn hàng",
      dataIndex: "key",
      render: (_: any, record: any) => (
        <a href={`orders/details/${record.id}`} className="cursor-pointer text-[#2C7BE5] underline">
          #{record.key}
        </a>
      ),
    },
    {
      title: "Người đặt",
      dataIndex: "user",
      render: (user: any) => (
        <div className="flex flex-row items-center justify-center gap-2">
          <Avatar src={user.avatarUrl} />
          <span
            onClick={() => {
              window.location.href = `/accounts/detail/${user.id}`;
            }}
            className="flex cursor-pointer items-center justify-center gap-1"
          >
            {user.fullName}
            <IoEyeOutline className="cursor-pointer text-xl text-blue-500" />
          </span>
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
      render: (address: string) => <span className="line-clamp-1">{address}</span>,
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
      render: (_: any, record: any) => {
        const isDisabled = (status: string) => {
          if (record.orderStatus === "pending" && status !== "processing" && status !== "cancelled") {
            return true;
          }
          if (record.orderStatus === "processing" && status !== "shipped") {
            return true;
          }
          if (record.orderStatus === "shipped" && status !== "delivered") {
            return true;
          }
          if (record.orderStatus === "delivered" && status !== "success") {
            return true;
          }
          if (record.orderStatus === "success") {
            return true;
          }
          return false;
        };

        return (
          <Select
            className="tho-border"
            onChange={(status: string) => {
              dispatch(
                updateOrder({
                  body: { order_status: status },
                  param: record.id,
                }),
              );
            }}
            defaultValue={record.orderStatus}
            style={{ width: 200 }}
          >
            {/* {record.orderStatus === "pending" ? (
              <>
                <Option key={record.id} value={"pending"}>
                  <StatusBadge text={"Đang chờ"} color="yellow" />
                </Option>
                <Option key={record.id} value={"processing"}>
                  <StatusBadge text={"Đang tiến hành"} color="blue" />
                </Option>
              </>
            ) : record.orderStatus === "processing" ? (
              <>
                <Option key={record.id} value={"processing"}>
                  <StatusBadge text={"Đang tiến hành"} color="blue" />
                </Option>
                <Option key={record.id} value={"shipped"}>
                  <StatusBadge text={"Đang giao hàng"} color="black" />
                </Option>
              </>
            ) : record.orderStatus === "shipped" ? (
              <>
                <Option key={record.id} value={"shipped"}>
                  <StatusBadge text={"Đang giao hàng"} color="black" />
                </Option>
                <Option key={record.id} value={"delivered"}>
                  <StatusBadge text={"Đã giao thành công"} color="green" />
                </Option>
              </>
            ) : record.orderStatus === "delivered" ? (
              <Option key={record.id} value={"delivered"}>
                <StatusBadge text={"Đã giao thành công"} color="green" />
              </Option>
            ) : record.orderStatus === "success" ? (
              <>
                <Option key={record.id} value={"success"}>
                  <StatusBadge text={"Đã hoàn thành"} color="green-capital" />
                </Option>
                <Option key={record.id} value={"cancelled"}>
                  <StatusBadge text={"Đã hủy"} color="red" />
                </Option>
              </>
            ) : (
              <Option key={record.id} value={"cancelled"}>
                <StatusBadge text={"Đã hủy"} color="red" />
              </Option>
            )} */}
            <Option key={"pending"} value="pending" disabled={true}>
              <StatusBadge text="Đang chờ" color="yellow" />
            </Option>
            <Option key={"processing"} value="processing" disabled={isDisabled("processing")}>
              <StatusBadge text="Đang tiến hành" color="blue" />
            </Option>
            <Option key={"shipped"} value="shipped" disabled={isDisabled("shipped")}>
              <StatusBadge text="Đang giao hàng" color="black" />
            </Option>
            <Option key={"delivered"} value="delivered" disabled={isDisabled("delivered")}>
              <StatusBadge text="Đã giao thành công" color="green" />
            </Option>
            <Option key={"cancelled"} value="cancelled" disabled={isDisabled("cancelled")}>
              <StatusBadge text="Đã hủy" color="red" />
            </Option>
            <Option key={"success"} value="success" disabled={true}>
              <StatusBadge text="Nhận hàng thành công" color="green" />
            </Option>
          </Select>
        );
      },
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
    },
  ];
};

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
