import { client } from "@/services/config/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRole } from "./role.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const prefix = "/api/roles";

export const getAllRoles = createAsyncThunk("role/get-all-roles", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IRole[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getRoleById = createAsyncThunk("role/get-role-by-id", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IRole>(prefix + `/${id}`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const createRole = createAsyncThunk("role/create-role", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updateRole = createAsyncThunk("role/update-role", async (payload: IThunkPayload, { rejectWithValue }) => {
  console.log("🦎 ~ updateRole ~ payload:", payload)
  try {
    const { response, data } = await client.patch(`${prefix}/${payload.param}`, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteRole = createAsyncThunk("role/delete-role", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(data) : id;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
