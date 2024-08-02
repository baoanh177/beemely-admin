import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { ITag } from "./tag.model";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: { [key in keyof Omit<ITag, "id">]: string } = {
  name: "Tên tag",
  description: "Mô tả",
  image: "Hình ảnh",
  parentId: "Parent để tạm",
  slug: "Slug",
  status: "Trạng thái"
};

const prefix = "/api/tags";

export const getAllTags = createAsyncThunk("tag/get-all-tags", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<ITag[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getTagById = createAsyncThunk("tag/get-tag-by-id", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<ITag>(prefix + `/${id}`);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createTag = createAsyncThunk("tag/create-tag", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<ITag[]>(prefix, payload); // ! ITag[]
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateTag = createAsyncThunk("tag/update-tag", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<ITag[]>(`${prefix}/${payload.param}`, payload); // ! ITag[]
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteTag = createAsyncThunk("tag/delete-tag", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : id;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
