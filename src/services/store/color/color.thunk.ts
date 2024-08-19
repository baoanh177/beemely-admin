import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { IColor } from "./color.model";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: { [key in keyof Omit<IColor, "id">]: string } = {
  name: "Tên màu",
  value: "Giá trị màu",
};

const prefix = "/api/colors";

export const getAllColors = createAsyncThunk("color/get-all-colors", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IColor[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getColorById = createAsyncThunk("color/get-color-by-id", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IColor>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createColor = createAsyncThunk("color/create-color", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IColor>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateColor = createAsyncThunk("color/update-color", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IColor>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteColor = createAsyncThunk("color/delete-color", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
