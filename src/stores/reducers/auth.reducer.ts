import { createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "../config/client";

import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { ILoginResponseData } from "@/shared/models/auth.model";

const prefix = "/api/auth";

export const login = createAsyncThunk("login", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<ILoginResponseData>(`${prefix}/login`, payload);
    if (response.status >= 400) return rejectWithValue(data)
    return data;
  } catch (error: any) {
    console.log("🦎 ~ login ~ error:", [error]);
    return rejectWithValue(error.response.data);
  }
});