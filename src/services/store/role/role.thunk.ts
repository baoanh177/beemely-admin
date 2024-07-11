import { client } from "@/services/config/client"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { IRole } from "./role.model"
import { IThunkPayload } from "@/shared/utils/shared-interfaces"

const prefix = "/api/roles"

export const getAllRoles = createAsyncThunk("role/get-all-roles", async (_, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IRole[]>(prefix)
    return response.status >= 400 ? rejectWithValue(data) : data
  }catch(error: any) {
    return rejectWithValue(error.response.data)
  }
})

export const createRole = createAsyncThunk("role/create-role", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IRole[]>(prefix, payload)
    return response.status >= 400 ? rejectWithValue(data) : data
  }catch(error: any) {
    return rejectWithValue(error.response.data)
  }
})