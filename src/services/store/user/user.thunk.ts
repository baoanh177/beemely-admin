import { client } from "@/services/config/client";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "./user.model";

const prefix = "/api/users";

export const getAllUsers = createAsyncThunk("user/get-all-users", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IUser[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getUserById = createAsyncThunk("user/get-user-by-id", async (id: string, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IUser>(`${prefix}/${id}`);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
