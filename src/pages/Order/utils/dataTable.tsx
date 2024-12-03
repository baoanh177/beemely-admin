import PaymentStatusBadge from "@/components/common/PaymentStatusBadge";
import StatusBadge from "@/components/common/StatusBadge";
import { EComplaintStatus, IComplaint } from "@/services/store/complaint/complaint.model";
import { EPaymentStatus, EStatusOrder } from "@/services/store/order/order.model";
import { updateOrder } from "@/services/store/order/order.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { Avatar, message, Modal, Select } from "antd";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import ComplaintItem from "./ComplaintItem";
import { useArchive } from "@/hooks/useArchive";
import { updateOrderComplaint } from "@/services/store/complaint/complaint.thunk";
import { IComplaintInitialState } from "@/services/store/complaint/complaint.slice";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import ComplaintStatusBadge from "./ComplaintStatusBadge";

const { Option } = Select;
const { confirm, destroyAll } = Modal;
export const getTableColumns: any = (dispatch: any) => {
  const { dispatch: complaintDispatch } = useArchive<IComplaintInitialState>("complaints");
  const navigate = useNavigate();

  const handleChangeStatus = async (id: string, status: EComplaintStatus, reason: string | undefined) => {
    await complaintDispatch(
      updateOrderComplaint({
        param: id,
        body: {
          status,
          reject_reason: reason,
        },
      }),
    ).then(() => {
      message.success("Cập nhật trạng thái khiếu nại thành công!");
      window.location.reload();
      destroyAll();
    });
  };

  const getStatusBadgeProps = (status: EStatusOrder) => {
    switch (status) {
      case "pending":
        return { text: "Chờ xác nhận", color: "yellow" };
      case "processing":
        return { text: "Đang chuẩn bị hàng", color: "blue" };
      case "delivering":
        return { text: "Đang giao hàng", color: "black" };
      case "compensating":
        return { text: "Gửi bù hàng", color: "black" };
      case "compensated":
        return { text: "Đã giao bù hàng", color: "green" };
      case "request_return":
        return { text: "Yêu cầu hoàn trả", color: "orange" };
      case "denied_return":
        return { text: "Hủy y/c hoàn trả", color: "gray" };
      case "returning":
        return { text: "Đang hoàn trả", color: "lightblue" };
      case "returned":
        return { text: "Đã hoàn trả", color: "purple" };
      case "cancelled":
        return { text: "Hủy đơn", color: "red" };
      case "success":
        return { text: "Nhận hàng thành công", color: "darkgreen" };
      default:
        return { text: "Không xác định", color: "gray" };
    }
  };

  return [
    {
      title: "Mã đơn hàng",
      dataIndex: "key",
      render: (_: any, record: any) => (
        <Link to={`/orders/details/${record.id}`} className="cursor-pointer text-[#2C7BE5] underline">
          #{record.key}
        </Link>
      ),
    },
    {
      title: "Người đặt",
      dataIndex: "user",
      render: (user: any) => (
        <div className="flex flex-row items-center justify-center gap-2">
          <Avatar src={user?.avatarUrl} />
          <span
            onClick={() => {
              navigate(`/accounts/detail/${user.id}`);
            }}
            className="flex cursor-pointer items-center justify-center gap-1"
          >
            {user?.fullName}
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
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      render: (status: EPaymentStatus) => <PaymentStatusBadge status={status} text={status} />,
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
          if (record.orderStatus === "returning" && status !== "returned" && status !== "returning") {
            return true;
          }
          if (record.orderStatus === "cancelled" && status !== "cancelled") {
            return true;
          }
          if (record.orderStatus === "delivered" && status !== "delivered") {
            return true;
          }
          if (record.orderStatus === "compensating" && status !== "compensated") {
            return true;
          }
          if (record.orderStatus === "compensated" && status !== "compensated") {
            return true;
          }
          if (record.orderStatus === "success" && status !== "success") {
            return true;
          }
          if (record.orderStatus === "denied_return" && status !== "denied_return") {
            return true;
          }
          if (record.orderStatus === "returned" && status !== "returned") {
            return true;
          }
          if (record.orderStatus === "request_return" && status !== "request_return") {
            return true;
          }
          return false;
        };

        return (
          <Select
            className="tho-border"
            onChange={async (status: string) => {
              if (record.orderStatus === "request_return") {
                return;
              } else {
                await dispatch(
                  updateOrder({
                    body: { order_status: status },
                    param: record.id,
                  }),
                );
              }
            }}
            onClick={() => {
              if (record.paymentStatus !== "completed") {
                toast.error("Đơn hàng chưa hoàn tất thanh toán. Không thể đổi trạng thái đơn hàng !");

                return;
              }
            }}
            defaultValue={record.orderStatus}
            style={{ width: 200 }}
          >
            {record.paymentStatus === "completed" && record.orderStatus !== "compensating" ? (
              <>
                <Option key={"pending"} value="pending" disabled={isDisabled("pending")}>
                  <StatusBadge text="Chờ xác nhận" color="yellow" disabled={isDisabled("pending")} />
                </Option>

                <Option key={"processing"} value="processing" disabled={isDisabled("processing")}>
                  <StatusBadge text="Đang chuẩn bị hàng" color="blue" disabled={isDisabled("processing")} />
                </Option>

                <Option key={"delivering"} value="delivering" disabled={isDisabled("delivering")}>
                  <StatusBadge text="Đang giao hàng" color="black" disabled={isDisabled("delivering")} />
                </Option>

                <Option key={"delivered"} value="delivered" disabled={isDisabled("delivered")}>
                  <StatusBadge text="Đã giao hàng" color="green" disabled={isDisabled("delivered")} />
                </Option>

                <Option key={"request_return"} value="request_return" disabled={isDisabled("request_return")}>
                  <StatusBadge text="Yêu cầu hoàn trả" color="orange" disabled={isDisabled("request_return")} />
                </Option>

                <Option key={"returning"} value="returning" disabled={isDisabled("returning")}>
                  <StatusBadge text="Đang hoàn trả" color="lightblue" disabled={isDisabled("returning")} />
                </Option>

                <Option key={"returned"} value="returned" disabled={isDisabled("returned")}>
                  <StatusBadge text="Đã hoàn trả" color="purple" disabled={isDisabled("returned")} />
                </Option>

                <Option key={"denied_return"} value="denied_return" disabled={isDisabled("denied_return")}>
                  <StatusBadge text="Hủy y/c hoàn trả" color="gray" disabled={isDisabled("denied_return")} />
                </Option>

                <Option key={"compensated"} value="compensated" disabled={isDisabled("compensated")}>
                  <StatusBadge text="Đã gửi bù hàng" color="green" disabled={isDisabled("compensated")} />
                </Option>

                <Option key={"cancelled"} value="cancelled" disabled={isDisabled("cancelled")}>
                  <StatusBadge text="Đã hủy" color="red" disabled={isDisabled("cancelled")} />
                </Option>

                <Option key={"success"} value="success" disabled={isDisabled("success")}>
                  <StatusBadge text="Đã nhận hàng" color="darkgreen" disabled={isDisabled("success")} />
                </Option>
              </>
            ) : record.orderStatus === "compensating" ? (
              <>
                <Option key={"compensating"} value="compensating" disabled={isDisabled("compensating")}>
                  <StatusBadge text="Gửi bù hàng" color="lightblue" disabled={isDisabled("compensating")} />
                </Option>

                <Option key={"compensated"} value="compensated" disabled={isDisabled("compensated")}>
                  <StatusBadge text="Đã gửi bù hàng" color="green" disabled={isDisabled("compensated")} />
                </Option>
              </>
            ) : (
              <Option key={`${record.orderStatus}`} value={`${record.orderStatus}`}>
                <StatusBadge {...getStatusBadgeProps(record.orderStatus)} />
              </Option>
            )}
          </Select>
        );
      },
    },
    {
      title: "Khiếu nại",
      dataIndex: "complaint",
      render: (complaint: IComplaint | null) => (
        <div className="flex items-center justify-center">
          {complaint ? (
            <div
              role="button"
              onClick={() =>
                confirm({
                  footer: null,
                  icon: null,
                  closeIcon: <IoMdClose />,
                  closable: true,
                  content: <ComplaintItem complaint={complaint} onUpdateStatus={handleChangeStatus} />,
                })
              }
              className={clsx("text-nowrap rounded-3xl bg-opacity-45 px-3 py-1 text-sm font-thin capitalize")}
            >
              <ComplaintStatusBadge status={complaint.status} />
            </div>
          ) : (
            <div className="h-3 w-8 rounded-3xl bg-green-400 bg-opacity-20" />
          )}
        </div>
      ),
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
