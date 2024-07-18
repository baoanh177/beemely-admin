import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { Ilabel } from "./label.model";

const prefix = "/api/labels";

export const getAlllabels = createAsyncThunk("label/get-all-labels", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<Ilabel[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getLabelById = createAsyncThunk("label/get-label-by-id", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<Ilabel>(prefix + `/${id}`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const createLabel = createAsyncThunk("label/create-label", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<Ilabel[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updateLabel = createAsyncThunk("label/update-label", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<Ilabel[]>(`${prefix}/${payload.param}`, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteLabel = createAsyncThunk("label/delete-label", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(data) : id;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});