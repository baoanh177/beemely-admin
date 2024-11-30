import React from "react";
import clsx from "clsx";
import { EStatusOrder } from "@/services/store/order/order.model";

export type OrderStatusBadgeColors =
  | "blue"
  | "green"
  | "orange"
  | "gray"
  | "red"
  | "yellow"
  | "green-capital"
  | "black"
  | "purple"
  | "lightblue"
  | "darkgreen";

export interface OrderStatusBadgeProps {
  status: EStatusOrder;
  color: OrderStatusBadgeColors | EStatusOrder;
  disabled?: boolean;
}

const CONVERT_STATUS: Record<EStatusOrder, string> = {
  pending: "Chờ xác nhận",
  processing: "Đang chuẩn bị hàng",
  delivering: "Đang giao hàng",
  delivered: "Đã giao hàng",
  success: "Đơn hàng đã hoàn thành",
  cancelled: "Đã hủy",
  request_return: "Đang khiếu nại",
  returning: "Đang được đổi trả",
  returned: "Trả hàng hoàn tiền thành công",
  denied_return: "Người bán từ chối khiếu nại",
  compensated: "Đã gửi bù hàng",
  compensating: "Đang gửi bù hàng",
};

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, color, disabled = false }) => {
  // @ts-ignore
  const colorMapping: Record<EStatusOrder | OrderStatusBadgeColors, string> = {
    [EStatusOrder.PENDING]: disabled ? "bg-orange-100 text-orange-300" : "bg-orange-50 text-orange-500",
    [EStatusOrder.PROCESSING]: disabled ? "bg-blue-100 text-blue-300" : "bg-cyan-50 text-cyan-500",
    [EStatusOrder.DELIVERING]: disabled ? "bg-yellow-100 text-yellow-300" : "bg-yellow-50 text-yellow-500",
    [EStatusOrder.DELIVERED]: disabled ? "bg-green-100 text-green-300" : "bg-green-50 text-green-600",
    [EStatusOrder.SUCCESS]: disabled ? "bg-green-200 text-green-700 capitalize" : "bg-green-100 text-green-900 capitalize",
    [EStatusOrder.CANCELLED]: disabled ? "bg-red-100 text-red-300" : "bg-red-50 text-red-500",
    [EStatusOrder.REQUEST_RETURN]: disabled ? "bg-purple-100 text-purple-300 capitalize" : "bg-[#F4ECFB] text-[#883DCF] capitalize",
    [EStatusOrder.RETURNING]: disabled ? "bg-purple-100 text-purple-300 capitalize" : "bg-[#F4ECFB] text-[#883DCF] capitalize",
    [EStatusOrder.RETURNED]: disabled ? "bg-gray-100 text-gray-300" : "bg-red-400 text-white-500",
    [EStatusOrder.DENIED_RETURN]: disabled ? "bg-gray-100 text-gray-300" : "bg-red-700 text-white-500",
    blue: disabled ? "bg-cyan-100 text-cyan-300" : "bg-cyan-50 text-cyan-500",
    green: disabled ? "bg-green-100 text-green-300" : "bg-green-50 text-green-600",
    orange: disabled ? "bg-orange-100 text-orange-300" : "bg-orange-50 text-orange-500",
    gray: disabled ? "bg-gray-100 text-gray-300" : "bg-gray-50 text-gray-500",
    red: disabled ? "bg-red-100 text-red-300" : "bg-red-50 text-red-500",
    yellow: disabled ? "bg-yellow-100 text-yellow-300 capitalize" : "bg-yellow-50 text-yellow-500 capitalize",
    black: disabled ? "bg-black-100 text-black-300 capitalize" : "bg-black-50 text-black-500 capitalize",
    purple: disabled ? "bg-[#E0D4F5] text-[#B08EDC] capitalize" : "bg-[#F4ECFB] text-[#883DCF] capitalize",
    lightblue: disabled ? "bg-blue-100 text-blue-300" : "bg-blue-50 text-blue-500",
    darkgreen: "bg-green-700 text-green-100",
  };

  const className = colorMapping[color] || "bg-gray-50 text-gray-500";

  return (
    <div className={clsx(className, "inline-block text-nowrap rounded-lg border-none px-[10px] py-1 text-center text-sm")}>
      {CONVERT_STATUS[status]}
    </div>
  );
};

export default OrderStatusBadge;
