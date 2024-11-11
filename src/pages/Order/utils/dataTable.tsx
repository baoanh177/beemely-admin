import imgPayos from "@/assets/images/Payos Logo.svg";
import imgVnPay from "@/assets/images/vnpay.webp";
import StatusBadge from "@/components/common/StatusBadge";
import { updateOrder } from "@/services/store/order/order.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { Avatar, Image, Select } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { NavigateFunction } from "react-router-dom";

const { Option } = Select;

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
            <IoEyeOutline className="min-w-[20px] cursor-pointer text-xl text-blue-500" />
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
          {paymentType === "payos" ? (
            <Image width={100} height={40} preview={false} src={imgPayos} />
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
          if (record.orderStatus === "pending" && status !== "processing" && status !== "cancelled" && status !== "pending") {
            return true;
          }
          if (record.orderStatus === "processing" && status !== "delivering" && status !== "processing") {
            return true;
          }
          if (record.orderStatus === "delivering" && status !== "delivering" && status !== "delivered") {
            return true;
          }
          if (["delivered", "success", "denied_return", "returned"].includes(record.orderStatus)) {
            return true;
          }
          if (record.orderStatus === "returning" && status !== "returned" && status !== "returning") {
            return true;
          }
          if (record.orderStatus === "cancelled" && status !== "processing" && status !== "pending" && status !== "cancelled") {
            return true;
          }
          return false;
        };

        return (
          <Select
            className="tho-border"
            onChange={(status: string) => {
              if (record.orderStatus === "request_return") {
                dispatch(
                  updateOrder({
                    body: { order_status: status === "yes" ? "returning" : "denied_return" },
                    param: record.id,
                  }),
                );
                window.location.reload();
              } else {
                dispatch(
                  updateOrder({
                    body: { order_status: status },
                    param: record.id,
                  }),
                );
              }
            }}
            defaultValue={record.orderStatus}
            style={{ width: 200 }}
          >
            {record.orderStatus !== "request_return" ? (
              <>
                <Option key={"pending"} value="pending" disabled={isDisabled("pending")}>
                  <StatusBadge text="Đang chờ" color="yellow" disabled={isDisabled("pending")} />
                </Option>

                <Option key={"processing"} value="processing" disabled={isDisabled("processing")}>
                  <StatusBadge text="Đang tiến hành" color="blue" disabled={isDisabled("processing")} />
                </Option>

                <Option key={"delivering"} value="delivering" disabled={isDisabled("delivering")}>
                  <StatusBadge text="Đang giao hàng" color="black" disabled={isDisabled("delivering")} />
                </Option>

                <Option key={"delivered"} value="delivered" disabled={isDisabled("delivered")}>
                  <StatusBadge text="Đã giao hàng" color="green" disabled={isDisabled("delivered")} />
                </Option>

                <Option key={"request_return"} value="request_return" disabled={true}>
                  <StatusBadge text="Yêu cầu hoàn trả" color="orange" disabled={true} />
                </Option>

                <Option key={"returning"} value="returning" disabled={isDisabled("returning")}>
                  <StatusBadge text="Đang hoàn trả" color="lightblue" disabled={isDisabled("returning")} />
                </Option>

                <Option key={"denied_return"} value="denied_return" disabled={true}>
                  <StatusBadge text="Hủy y/c hoàn trả" color="gray" disabled={true} />
                </Option>

                <Option key={"returned"} value="returned" disabled={isDisabled("returned")}>
                  <StatusBadge text="Đã hoàn trả" color="purple" disabled={isDisabled("returned")} />
                </Option>

                <Option key={"cancelled"} value="cancelled" disabled={isDisabled("cancelled")}>
                  <StatusBadge text="Đã hủy" color="red" disabled={isDisabled("cancelled")} />
                </Option>

                <Option key={"success"} value="success" disabled={true}>
                  <StatusBadge text="Đã nhận hàng" color="darkgreen" disabled={true} />
                </Option>
              </>
            ) : (
              <>
                <Option key={"request_return"} value="request_return" disabled={true}>
                  <StatusBadge text="Yêu cầu hoàn trả" color="orange" />
                </Option>
                <Option key={"yes"} value="yes">
                  <StatusBadge text="Đồng ý" color="green" />
                </Option>

                <Option key={"no"} value="no">
                  <StatusBadge text="Từ chối" color="red" />
                </Option>
              </>
            )}
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

export const getGridButtons = (navigate: NavigateFunction): IGridButton[] => {
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
