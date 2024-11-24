import { EStatusOrder } from "../order/order.model";

export interface IResponseStat {
  id: string;
  name: string;
  total: number;
}
export interface IResponseTotalRevenue {
  date: string;
  totalRevenue: number;
  orderCount: number;
}

export type TResponseOrderStatusCount = Record<EStatusOrder, number>;
