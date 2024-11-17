import { ITag } from "../tag/tag.model";
import { IVoucher } from "../voucher/voucher.model";

export interface IOrder {
  [x: string]: any;
  id: string;
  user: {};
  items: any[];
  totalPrice: number;
  regularTotalPrice: number;
  shippingAddress: string;
  phoneNumber: string;
  order_status: string;
  paymentStatus: EPaymentStatus;
  paymentType: string;
  userName: string;
  shippingFee: number;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
  uniqueId: string;
}

export enum EStatusOrder {
  PENDING = "pending",
  PROCESSING = "processing",
  DELIVERING = "delivering",
  DELIVERED = "delivered",
  SUCCESS = "success",
  CANCELLED = "cancelled",
  REQUEST_RETURN = "request_return",
  RETURNING = "returning",
  RETURNED = "returned",
}

export enum EOrderLog {
  CREATED = "CREATED",
  UPDATE = "UPDATE",
}

export enum EWriteLogBy {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}
interface IUserLogsResponse {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  vouchers: IVoucher[];
  tags: ITag[];
  isVerified: boolean;
  isNewUser: boolean;
  gender: string;
}

export interface IOrderLog {
  id: string;
  order: IOrder;
  logType: EOrderLog;
  status: EStatusOrder;
  performedByUser: IUserLogsResponse;
  writeBy: EWriteLogBy;
  createdAt: string;
  updatedAt: string;
}

export enum EPaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}
