import { EStatusOrder } from "../order/order.model";

export interface IResponseStat {
  id: string;
  name: string;
  total: number;
}

export type TResponseOrderStatusCount = Record<EStatusOrder, number>;
