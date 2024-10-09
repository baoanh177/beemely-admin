import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { IShippingMethod } from "./shippingMethod.model";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: { [key in keyof Omit<IShippingMethod, "id">]: string } = {
  name: "Tên phương pháp vận chuyển",
  cost: "Giá",
  estimatedDeliveryTime: "Thời gian giao hàng ước tính",
};

const prefix = "/api/shipping-methods";

export const getAllShippingMethod = createAsyncThunk(
  "appShippingMethod/getAllShippingMethod",
  async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
      const { response, data } = await client.get<IShippingMethod[]>(prefix, payload);
      return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
    } catch (error: any) {
      return rejectWithValue(messageCreator(error.response.data, dataKeys));
    }
  },
);

export const getShippingMethodById = createAsyncThunk(
  "appShippingMethod/getShippingMethodById",
  async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
      const { response, data } = await client.get<IShippingMethod>(prefix, payload);
      return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
    } catch (error: any) {
      return rejectWithValue(messageCreator(error.response.data, dataKeys));
    }
  },
);

export const createShippingMethod = createAsyncThunk(
  "appShippingMethod/createShippingMethod",
  async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
      const { response, data } = await client.post<IShippingMethod>(prefix, payload);
      return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
    } catch (error: any) {
      return rejectWithValue(messageCreator(error.response.data, dataKeys));
    }
  },
);

export const updateShippingMethod = createAsyncThunk(
  "appShippingMethod/updateShippingMethod",
  async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
      const { response, data } = await client.patch<IShippingMethod>(prefix, payload);
      return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
    } catch (error: any) {
      return rejectWithValue(messageCreator(error.response.data, dataKeys));
    }
  },
);

export const deleteShippingMethod = createAsyncThunk(
  "appShippingMethod/deleteShippingMethod",
  async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
      const { response, data } = await client.delete(prefix, payload);
      return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
    } catch (error: any) {
      return rejectWithValue(messageCreator(error.response.data, dataKeys));
    }
  },
);
