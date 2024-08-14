import { EActiveStatus } from "@/shared/enums/status";
import { Dayjs } from "dayjs";
import { IVoucherType } from "../voucherType/voucherType.model";

export interface IVoucher {
  id: string;
  name: string;
  code: string;
  maxUsage: number;
  duration: number;
  discount: number;
  discountTypes: "percentage" | "fixed";
  minimumOrderPrice: number;
  voucherType: IVoucherType;
  status: EActiveStatus;
  startDate: Dayjs;
  endDate: Dayjs;
}
