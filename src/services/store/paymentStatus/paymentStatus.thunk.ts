import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/services/config/client";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { messageCreator } from "@/services/config/message-creator";
import { IPaymentStatus } from "./paymentStatus.model";

const dataKeys: { [key in keyof Omit<IPaymentStatus, "id">]: string } = {
  name: "Tên trạng thái thanh toán",
};

const prefix = "/api/payment-statuses";

export const getAllPaymentStatuses = createAsyncThunk(
  "paymentStatus/getAllPaymentStatuses",
  async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
      const { response, data } = await client.get<IPaymentStatus[]>(prefix, payload);
      return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
    } catch (error: any) {
      return rejectWithValue(messageCreator(error.response.data, dataKeys));
    }
  },
);

export const getPaymentStatusById = createAsyncThunk("paymentStatus/getPaymentStatusById", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IPaymentStatus>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createPaymentStatus = createAsyncThunk("paymentStatus/createPaymentStatus", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IPaymentStatus[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updatePaymentStatus = createAsyncThunk("paymentStatus/updatePaymentStatus", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IPaymentStatus[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deletePaymentStatus = createAsyncThunk("paymentStatus/deletePaymentStatus", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
