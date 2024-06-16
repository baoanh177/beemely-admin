import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../config/client";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const prefix = "/api/v1/auth";
export const login = createAsyncThunk(
  "login",
  async (payload: IThunkPayload, thunkAPI) => {
    try {
      const { data } = await client.post(`${prefix}/login`, payload);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (payload: IThunkPayload, thunkAPI) => {
    try {
      const { data } = await client.post(`${prefix}/register`, payload);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    const { data } = await client.post(`${prefix}/logout`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
