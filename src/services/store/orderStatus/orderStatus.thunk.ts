import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { messageCreator } from "@/services/config/message-creator";
import { IOrderStatus } from "./orderStatus.model";

const dataKeys: { [key in keyof Omit<IOrderStatus, "id">]: string } = {
  name: "Tên trạng thái đơn hàng",
  description: "Mô tả",
};

const prefix = "/api/order-statuses";

export const getAllOrderStatuses = createAsyncThunk(
  "orderStatus/get-all-order-statuses",
  async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
      const { response, data } = await client.get<IOrderStatus[]>(prefix, payload);
      return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
    } catch (error: any) {
      return rejectWithValue(messageCreator(error.response.data, dataKeys));
    }
  },
);

export const getOrderStatusById = createAsyncThunk("orderStatus/get-order-status-by-id", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IOrderStatus>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createOrderStatus = createAsyncThunk("orderStatus/create-order-status", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IOrderStatus>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateOrderStatus = createAsyncThunk("orderStatus/update-order-status", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IOrderStatus>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteOrderStatus = createAsyncThunk("orderStatus/delete-order-status", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
