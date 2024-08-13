import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/services/config/client";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { messageCreator } from "@/services/config/message-creator";
import { IVoucherType } from "./voucherType.model";

const dataKeys: { [key in keyof Omit<IVoucherType, "id">]: string } = {
  name: "Tên loại mã giảm giá",
};

const prefix = "/api/voucher-types";

export const getAllVoucherTypes = createAsyncThunk("voucher-types/getAllVoucherTypes", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IVoucherType[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getVoucherTypeByid = createAsyncThunk("voucher-types/getVoucherTypeByid", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IVoucherType>(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createVoucherType = createAsyncThunk("voucher-types/createVoucherType", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IVoucherType>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateVoucherType = createAsyncThunk("voucher-types/updateVoucherType", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IVoucherType>(`${prefix}/${payload.param}`, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteVoucherType = createAsyncThunk("voucher-types/deleteVoucherType", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : id;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
