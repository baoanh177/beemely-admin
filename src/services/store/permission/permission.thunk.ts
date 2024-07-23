import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPermission } from "./permission.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: { [key in keyof Omit<IPermission, "id">]: string } = {
  label: "Tên quyền",
  module: "Module",
  name: "Giá trị",
};

const prefix = "/api/permissions";

export const getAllPermissions = createAsyncThunk("permission/get-all-permissions", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IPermission[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getPermissionById = createAsyncThunk("permission/get-permission-by-id", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IPermission>(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const createPermission = createAsyncThunk("permission/create-permissions", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updatePermission = createAsyncThunk("permission/update-permission", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch(`${prefix}/${payload.param}`, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deletePermission = createAsyncThunk("permission/delete-permission", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : id;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getAllModules = createAsyncThunk("permission/get-all-modules", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<string[]>(prefix + "/modules");
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
