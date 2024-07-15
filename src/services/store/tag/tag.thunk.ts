import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { Itag } from "./tag.model";

const prefix = "/api/tags";

export const getAllTags = createAsyncThunk("tag/get-all-tags", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<Itag[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getTagById = createAsyncThunk("tag/get-tag-by-id", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<Itag>(prefix + `/${id}`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const createTag = createAsyncThunk("tag/create-tag", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<Itag[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updateTag = createAsyncThunk("tag/update-tag", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<Itag[]>(`${prefix}/${payload.param}`, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteTag = createAsyncThunk("tag/delete-tag", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(data) : id;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
