import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { ILabel } from "./label.model";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: { [key in keyof Omit<ILabel, "id">]: string } = {
  name: "Tên label",
  description: "Mô tả",
  status: "Trạng thái",
};

const prefix = "/api/labels";

export const getAllLabels = createAsyncThunk("label/get-all-labels", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<ILabel[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getLabelById = createAsyncThunk("label/get-label-by-id", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<ILabel>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createLabel = createAsyncThunk("label/create-label", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<ILabel>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateLabel = createAsyncThunk("label/update-label", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<ILabel>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteLabel = createAsyncThunk("label/delete-label", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
