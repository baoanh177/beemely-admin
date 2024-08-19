import { client } from "@/services/config/client";
import { messageCreator } from "@/services/config/message-creator";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAccount } from "./account.model";

const prefix = "/api/users";

const dataKeys: { [key in keyof Omit<IAccount, "id" | "addresses" | "vouchers">]: string } = {
  avatarUrl: "Ảnh đại diện",
  email: "Email",
  fullName: "Tên",
  gender: "Giới tính",
  phone: "Số điện thoại",
  roles: "Vai trò",
  status: "Trạng thái",
  userName: "Tên",
};

export const getAllAccounts = createAsyncThunk("account/get-all-accounts", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IAccount[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateAccount = createAsyncThunk("account/update-account", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IAccount>(`${prefix}`, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
})

export const deleteAccount = createAsyncThunk("account/delete-account", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete<IAccount>(`${prefix}`, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
})

export const createAccount = createAsyncThunk("account/create-account", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IAccount>(`${prefix}`, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
})