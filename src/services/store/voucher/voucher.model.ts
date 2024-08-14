import { EActiveStatus } from "@/shared/enums/status";
import { Dayjs } from "dayjs";

export interface IVoucher {
  id: string;
  name: string;
  code: string;
  maxUsage: number;
  duration: number;
  discount: number;
  discountTypes: "percentage" | "fixed";
  minimumOrderPrice: number;
  voucherType: { id: string; name: string };
  status: EActiveStatus;
  startDate: Dayjs;
  endDate: Dayjs;
}
