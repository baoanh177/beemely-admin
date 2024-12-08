import { EActiveStatus } from "@/shared/enums/status";
import { Dayjs } from "dayjs";
import { EVoucherType } from "@/shared/enums/voucherType";

export interface IVoucher {
  id: string;
  name: string;
  code: string;
  maxUsage: number;
  maxReduce: number;
  duration: number;
  discount: number;
  discountTypes: "percentage" | "fixed";
  minimumOrderPrice: number;
  voucherType: EVoucherType;
  orderCount: number;
  status: EActiveStatus;
  startDate: Dayjs;
  endDate: Dayjs;
}
