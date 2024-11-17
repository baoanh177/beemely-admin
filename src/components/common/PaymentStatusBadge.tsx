import { EPaymentStatus } from "@/services/store/order/order.model";
import clsx from "clsx";

export interface PaymentStatusBadgeProps {
  text: EPaymentStatus;
  status: EPaymentStatus;
  disabled?: boolean;
}

const CONVERT_STATUS = {
  pending: "Chờ thanh toán" as const,
  completed: "Đã thanh toán" as const,
  failed: "Thanh toán thất bại" as const,
};

const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ text, status, disabled = false }) => {
  const colorMapping: Record<EPaymentStatus, string> = {
    [EPaymentStatus.PENDING]: disabled ? "bg-orange-100 text-orange-300" : "bg-orange-50 text-orange-500",
    [EPaymentStatus.COMPLETED]: disabled ? "bg-green-100 text-green-300" : "bg-green-50 text-green-600",
    [EPaymentStatus.FAILED]: disabled ? "bg-red-100 text-red-300" : "bg-red-50 text-red-500",
  };

  const className = colorMapping[status] || "bg-gray-50 text-gray-500";

  return (
    <div className={clsx(className, "text-m-semibold inline-block text-nowrap rounded-lg border-none px-[10px] py-1 text-center")}>
      {CONVERT_STATUS[text]}
    </div>
  );
};

export default PaymentStatusBadge;
