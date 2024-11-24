import { EComplaintStatus } from "@/services/store/complaint/complaint.model";
import clsx from "clsx";

export interface ComplaintStatusBadgeProps {
  status: EComplaintStatus;
  disabled?: boolean;
}

const CONVERT_STATUS: Record<EComplaintStatus, string> = {
  WITHDRAWN: "Người dùng thu hồi khiếu nại",
  CANCELLED: "Đã bị từ chối",
  RESOLVED: "Đã giải quyết",
  PENDING: "Đang chờ giải quyết",
};

const ComplaintStatusBadge: React.FC<ComplaintStatusBadgeProps> = ({ status, disabled = false }) => {
  const colorMapping: Record<EComplaintStatus, string> = {
    [EComplaintStatus.PENDING]: disabled ? "bg-orange-100 text-orange-300" : "bg-orange-50 text-orange-500",
    [EComplaintStatus.RESOLVED]: disabled ? "bg-green-100 text-green-300" : "bg-green-50 text-green-600",
    [EComplaintStatus.CANCELLED]: disabled ? "bg-red-100 text-red-300" : "bg-red-50 text-red-500",
    [EComplaintStatus.WITHDRAWN]: disabled ? "bg-yellow-100 text-yellow-300" : "bg-yellow-50 text-yellow-500",
  };

  const className = colorMapping[status] || "bg-gray-50 text-gray-500";

  return (
    <div className={clsx(className, "inline-block text-nowrap rounded-lg border-none px-[10px] py-1 text-center text-sm font-normal")}>
      {CONVERT_STATUS[status]}
    </div>
  );
};

export default ComplaintStatusBadge;
