import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/services/config/client";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { IGender } from "./gender.model";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: { [key in keyof Omit<IGender, "id">]: string } = {
  name: "Tên giới tính",
};

const prefix = "/api/genders";

export const getAllGenders = createAsyncThunk("gender/get-all-genders", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IGender[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getGenderById = createAsyncThunk("gender/get-gender-by-id", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IGender>(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createGender = createAsyncThunk("gender/create-gender", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IGender[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateGender = createAsyncThunk("gender/update-gender", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IGender[]>(`${prefix}/${payload.param}`, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteGender = createAsyncThunk("gender/delete-gender", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : id;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const searchGenders = createAsyncThunk("gender/search-genders", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IGender[]>(`${prefix}?name=${payload.query?.search}`);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
