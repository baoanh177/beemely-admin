export interface IComplaint {
  id?: string;
  order: string;
  user: string;
  reason: EComplaintReason;
  description: string;
  images: string[];
  status: EComplaintStatus;
}
export enum EComplaintReason {
  PRODUCT_DAMAGED = "PRODUCT_DAMAGED",
  WRONG_ITEM_RECEIVED = "WRONG_ITEM_RECEIVED",
  MISSING_ITEM = "MISSING_ITEM",
  LATE_DELIVERY = "LATE_DELIVERY",
  OTHER = "OTHER",
}

export enum EComplaintStatus {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  CANCELLED = "CANCELLED",
  WITHDRAWN = "WITHDRAWN",
}

export const COMPLAINT_REASONS = [
  { value: EComplaintReason.PRODUCT_DAMAGED, label: "Sản phẩm bị hỏng" },
  { value: EComplaintReason.WRONG_ITEM_RECEIVED, label: "Nhận sai sản phẩm" },
  { value: EComplaintReason.MISSING_ITEM, label: "Thiếu sản phẩm" },
  { value: EComplaintReason.LATE_DELIVERY, label: "Giao hàng chậm" },
  { value: EComplaintReason.OTHER, label: "Lý do khác" },
];

export const COMPLAINT_REASONS_CONVERT: Record<EComplaintReason, string> = {
  PRODUCT_DAMAGED: "Sản phẩm bị hỏng",
  WRONG_ITEM_RECEIVED: "Nhận sai sản phẩm",
  MISSING_ITEM: "Thiếu sản phẩm",
  LATE_DELIVERY: "Giao hàng chậm",
  OTHER: "Lý do khác",
};

export const COMPLAINT_STATUS = [
  { value: EComplaintStatus.PENDING, label: "Đang xử lý" },
  { value: EComplaintStatus.RESOLVED, label: "Đã xử lý" },
  { value: EComplaintStatus.CANCELLED, label: "Đã hủy" },
  { value: EComplaintStatus.WITHDRAWN, label: "Đã rút lại" },
];

export const COMPLAINT_STATUS_CONVERT: Record<EComplaintStatus, string> = {
  PENDING: "Đang xử lý",
  RESOLVED: "Đã được chấp nhận",
  CANCELLED: "Bị từ chối",
  WITHDRAWN: "Người dùng thu hồi khiếu nại",
};
