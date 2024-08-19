import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRole } from "./role.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { messageCreator } from "@/services/config/message-creator";

const prefix = "/api/roles";

const dataKeys: { [key in keyof Omit<IRole, "id">]: string } = {
  name: "Tên vai trò",
  permissions: "Quyền",
};

export const getAllRoles = createAsyncThunk("role/get-all-roles", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IRole[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getRoleById = createAsyncThunk("role/get-role-by-id", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IRole>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const createRole = createAsyncThunk("role/create-role", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateRole = createAsyncThunk("role/update-role", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IRole>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteRole = createAsyncThunk("role/delete-role", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
