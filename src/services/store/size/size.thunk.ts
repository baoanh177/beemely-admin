import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { ISize } from "./size.model";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: { [key in keyof Omit<ISize, "id">]: string } = {
  name: "Tên kích cỡ",
  gender: "Giới tính",
};

const prefix = "/api/sizes";

export const getAllSizes = createAsyncThunk("size/get-all-sizes", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<ISize[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getSizeById = createAsyncThunk("size/get-size-by-id", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<ISize>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createSize = createAsyncThunk("size/create-size", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<ISize>(prefix, payload);

    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateSize = createAsyncThunk("size/update-size", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<ISize>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteSize = createAsyncThunk("size/delete-size", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
