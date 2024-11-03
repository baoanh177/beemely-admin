export interface IOrder {
  id: string;
  user: {};
  items: any[];
  totalPrice: number;
  regularTotalPrice: number;
  shippingAddress: string;
  phoneNumber: string;
  order_status: string;
  paymentStatus: string;
  paymentType: string;
  userName: string;
  shippingFee: number;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
  uniqueId: string;
}
