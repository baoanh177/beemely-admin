import PaymentStatusBadge from "@/components/common/PaymentStatusBadge";
import { EComplaintStatus, IComplaint } from "@/services/store/complaint/complaint.model";
import { EPaymentStatus, EStatusOrder, IOrder } from "@/services/store/order/order.model";
import { getAllOrder, updateOrder } from "@/services/store/order/order.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { Avatar, Button, Dropdown, Image, message, Modal } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import ComplaintItem from "./ComplaintItem";
import { useArchive } from "@/hooks/useArchive";
import { updateOrderComplaint } from "@/services/store/complaint/complaint.thunk";
import { IComplaintInitialState } from "@/services/store/complaint/complaint.slice";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import ComplaintStatusBadge from "./ComplaintStatusBadge";
import OrderStatusBadge from "../groups/OrderStatusBadge";
import { RiEditBoxLine } from "react-icons/ri";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import imgPayos from "@/assets/images/Payos Logo.svg";
import imgVnPay from "@/assets/images/vnpay.webp";
import codImage from "@/assets/images/cod-logo.svg";

const { confirm, destroyAll } = Modal;
export const getTableColumns: any = (dispatch: any) => {
  const { dispatch: complaintDispatch } = useArchive<IComplaintInitialState>("complaints");
  const { dispatch: orderDispatch } = useArchive<IOrderInitialState>("order");
  const navigate = useNavigate();

  const handleChangeStatus = async (id: string, status: EComplaintStatus, reason: string | undefined) => {
    try {
      await complaintDispatch(
        updateOrderComplaint({
          param: id,
          body: {
            status,
            reject_reason: reason,
          },
        }),
      ).unwrap();
      message.success("Cập nhật trạng thái khiếu nại thành công!");
      await orderDispatch(getAllOrder({}));
      destroyAll();
    } catch (error: any) {
      const errorMessage = error.errors.message || "Cập nhật trạng thái khiếu nại thất bại!";
      message.error(errorMessage);
      await orderDispatch(getAllOrder({}));
      destroyAll();
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
      title: "Phương thức thanh toán",
      dataIndex: "paymentType",
      render: (paymentType: string) => (
        <div className="flex justify-center">
          {paymentType === "payos" ? (
            <Image width={90} height={30} preview={false} src={imgPayos} />
          ) : paymentType === "cod" ? (
            <Image width={90} height={90} preview={false} src={codImage} />
          ) : (
            <Image width={60} height={16} preview={false} src={imgVnPay} />
          )}
        </div>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      render: (status: EStatusOrder) => <OrderStatusBadge status={status} color={status} />,
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
    {
      title: "Hành động",
      dataIndex: "orderStatus",
      render: (_: any, record: IOrder) => {
        const isDisabled = (status: EStatusOrder) => {
          const currentStatus = record.orderStatus;

          //@ts-ignore
          const allowedTransitions: Record<EStatusOrder, string[]> = {
            pending: ["processing"],
            processing: ["delivering"],
            delivering: ["delivered"],
            returning: ["returned"],
            delivered: ["delivered"],
            compensating: ["compensated"],
            compensated: ["compensated"],
            returned: ["returned"],
          };

          return !allowedTransitions[currentStatus]?.includes(status);
        };
        //@ts-ignore
        const statusTexts: Record<EStatusOrder, string> = {
          pending: "Chờ xác nhận",
          processing: "Đang chuẩn bị hàng",
          delivering: "Đang giao hàng",
          delivered: "Đã giao hàng",
          returning: "Đang hoàn trả",
          returned: "Đã hoàn trả",
          compensating: "Đang đổi hàng mới",
          compensated: "Đã đổi hàng mới",
        };

        const generateMenuItems = () => {
          if (record.paymentStatus !== "completed" && record.paymentType !== "cod") {
            return [
              {
                key: record.orderStatus,
                label: statusTexts[record.orderStatus] || "Trạng thái",
                disabled: true,
              },
            ];
          }

          return Object.keys(statusTexts).map((status) => {
            const convertStatus = status as EStatusOrder;
            return {
              key: status,
              label: statusTexts[convertStatus],
              disabled: isDisabled(convertStatus) || status === record.orderStatus,
              onClick: () => {
                if (!isDisabled(convertStatus) && status !== record.orderStatus) {
                  dispatch(
                    updateOrder({
                      body: { order_status: convertStatus },
                      param: record.id,
                    }),
                  );
                }
              },
            };
          });
        };

        const items = generateMenuItems();

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button type="default" icon={<RiEditBoxLine />} />
          </Dropdown>
        );
      },
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
