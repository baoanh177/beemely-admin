import React from "react";
import clsx from "clsx";
import { EStatusOrder } from "@/services/store/order/order.model";

export interface OrderStatusBadgeProps {
  status: EStatusOrder;
  color: EStatusOrder;
  disabled?: boolean;
}

const CONVERT_STATUS: Record<EStatusOrder, string> = {
  pending: "Chờ xác nhận",
  processing: "Đang chuẩn bị hàng",
  delivering: "Đang giao hàng",
  delivered: "Đã giao hàng",
  success: "Hoàn thành",
  cancelled: "Hủy",
  request_return: "Khiếu nại",
  returning: "Đang hoàn trả",
  returned: "Trả hàng hoàn tiền",
  denied_return: "Từ chối khiếu nại",
  compensating: "Đang đổi hàng mới cho khách",
  compensated: "Đã đổi hàng mới cho khách",
};

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, color, disabled = false }) => {
  const colorMapping: Record<EStatusOrder, string> = {
    [EStatusOrder.PENDING]: disabled ? "bg-orange-100 text-orange-300" : "bg-orange-50 text-orange-500",
    [EStatusOrder.PROCESSING]: disabled ? "bg-blue-100 text-blue-300" : "bg-cyan-50 text-cyan-500",
    [EStatusOrder.DELIVERING]: disabled ? "bg-yellow-100 text-yellow-300" : "bg-yellow-50 text-yellow-500",
    [EStatusOrder.DELIVERED]: disabled ? "bg-green-100 text-green-300" : "bg-green-50 text-green-600",
    [EStatusOrder.SUCCESS]: disabled ? "bg-green-200 text-green-700 capitalize" : "bg-green-200 text-green-700 capitalize",
    [EStatusOrder.CANCELLED]: disabled ? "bg-red-100 text-red-300" : "bg-red-50 text-red-500",
    [EStatusOrder.REQUEST_RETURN]: disabled ? "bg-purple-100 text-purple-300 capitalize" : "bg-[#F4ECFB] text-[#883DCF] capitalize",
    [EStatusOrder.RETURNING]: disabled ? "bg-purple-100 text-purple-300 capitalize" : "bg-[#F4ECFB] text-[#883DCF] capitalize",
    [EStatusOrder.RETURNED]: disabled ? "bg-gray-100 text-gray-300" : "bg-red-400 text-white",
    [EStatusOrder.DENIED_RETURN]: disabled ? "bg-gray-100 text-gray-300" : "bg-red-700 text-white",
    [EStatusOrder.COMPENSATING]: disabled ? "bg-gray-100 text-gray-300" : "bg-blue-50 text-blue-500",
    [EStatusOrder.COMPENSATED]: disabled ? "bg-gray-100 text-gray-300" : "bg-blue-100 text-blue-700",
  };

  const className = colorMapping[color] || "bg-gray-50 text-gray-500";

  return (
    <div className={clsx(className, "text-m-semibold inline-block text-nowrap rounded-lg border-none px-[10px] py-1 text-center")}>
      {CONVERT_STATUS[status]}
    </div>
  );
};

export default OrderStatusBadge;
