import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { IBrand } from "./brand.model";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: { [key in keyof Omit<IBrand, "id" | "productCount">]: string } = {
  name: "Tên brand",
  description: "Mô tả",
  image: "Hình ảnh",
};

const prefix = "/api/brands";

export const getAllBrands = createAsyncThunk("brand/get-all-brands", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IBrand[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getBrandById = createAsyncThunk("brand/get-brand-by-id", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IBrand>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createBrand = createAsyncThunk("brand/create-brand", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IBrand>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateBrand = createAsyncThunk("brand/update-brand", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IBrand>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteBrand = createAsyncThunk("brand/delete-brand", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
