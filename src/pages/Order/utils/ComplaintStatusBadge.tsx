import { EComplaintStatus } from "@/services/store/complaint/complaint.model";
import clsx from "clsx";

export const COMPLAINT_STATUS_CONVERT: Record<EComplaintStatus, { text: string; colorClass: string }> = {
  PENDING: { text: "Đang chờ xử lý", colorClass: "bg-yellow-400 text-yellow-700" },
  PROCESSING: { text: "Đang xử lý", colorClass: "bg-blue-400 text-blue-700" },
  RESOLVED: { text: "Đã xử lý", colorClass: "bg-green-400 text-green-700" },
  REJECTED: { text: "Bị từ chối", colorClass: "bg-red-400 text-red-600" },
  WITHDRAWN: { text: "Người dùng thu hồi khiếu nại", colorClass: "bg-gray-400 text-gray-700" },
  COMPENSATE: { text: "Đã xử lý", colorClass: "bg-green-400 text-green-700" },
};

interface ComplaintStatusBadgeProps {
  status: EComplaintStatus;
}

const ComplaintStatusBadge = ({ status }: ComplaintStatusBadgeProps) => (
  <div className="flex items-center justify-center">
    <div
      role="button"
      className={clsx("text-nowrap rounded-lg bg-opacity-45 px-3 py-1 text-sm capitalize", COMPLAINT_STATUS_CONVERT[status].colorClass)}
    >
      {COMPLAINT_STATUS_CONVERT[status].text}
    </div>
  </div>
);

export default ComplaintStatusBadge;
