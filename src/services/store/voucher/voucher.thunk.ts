import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/services/config/client";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { messageCreator } from "@/services/config/message-creator";
import { IVoucher } from "./voucher.model";

const dataKeys: { [key in keyof Omit<IVoucher, "id" | "orderCount" | "maxReduce">]: string } = {
  name: "Tên giới tính",
  maxUsage: "Số lần sử dụng tối đa",
  code: "Mã giảm giá",
  duration: "Thời gian hiệu lực",
  discount: "Giảm giá",
  discountTypes: "Loại giảm giá",
  minimumOrderPrice: "Giá trị đơn hàng tối thiểu",
  startDate: "Ngày bắt đầu",
  status: "Trạng thái",
  endDate: "Ngày kết thúc",
  voucherType: "Loại mã giảm giá",
};

const prefix = "/api/vouchers";

export const getAllVouchers = createAsyncThunk("voucher/getAllVouchers", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IVoucher[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getVoucherById = createAsyncThunk("voucher/getVoucherById", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IVoucher>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createVoucher = createAsyncThunk("voucher/createVoucher", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IVoucher[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateVoucher = createAsyncThunk("voucher/updateVoucher", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IVoucher>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteVoucher = createAsyncThunk("voucher/deleteVoucher", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
