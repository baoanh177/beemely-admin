import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { messageCreator } from "@/services/config/message-creator";
import { IOrder, IOrderLog } from "./order.model";

const dataKeys: { [key in keyof Omit<IOrder, "id">]: string } = {
  uniqueId: "Mã đơn hàng",
  user: "Người dùng",
  items: "Các sản phẩm",
  totalPrice: "Tổng giá",
  regularTotalPrice: "Tổng giá thường",
  shippingAddress: "Địa chỉ giao hàng",
  order_status: "Trạng thái đơn hàng",
  phoneNumber: "Số điện thoại",
  paymentType: "Loại thanh toán",
  paymentStatus: "Trạng thái thanh toán",
  userName: "Tên người dùng",
  shippingFee: "Phí vận chuyển",
  userEmail: "Email người dùng",
  createdAt: "Ngày tạo ",
  updatedAt: "Ngày cập nhật ",
};

const prefix = "/api/orders";

export const getAllOrder = createAsyncThunk("order/get-all-order", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IOrder[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getOrderById = createAsyncThunk("order/get-order-by-id", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IOrder>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getOrderLogsByOrderId = createAsyncThunk(
  "order/get-order-logs-by-order-id",
  async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
      const { response, data } = await client.get<IOrderLog[]>(`/api/order-logs/`, payload);
      return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
    } catch (error: any) {
      return rejectWithValue(messageCreator(error.response.data, dataKeys));
    }
  },
);

export const createOrder = createAsyncThunk("order/create-order", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IOrder>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateOrder = createAsyncThunk("order/update-order", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IOrder>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteOrder = createAsyncThunk("order/delete-order", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
