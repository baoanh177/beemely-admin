import { client } from "@/services/config/client";
import { messageCreator } from "@/services/config/message-creator";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../product/product.model";
import { IResponseStat, IResponseTotalRevenue, TResponseOrderStatusCount } from "./stat.model";

const dataKeys: { [key in keyof Omit<IResponseStat, "id">]: string } = {
  name: "Tên tag",
  total: " Tổng",
};
const prefix = "/api/stats";

export const getMostPurchasedSize = createAsyncThunk("stats/get-size", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IResponseStat[]>(prefix + "/most-purchased-size", payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getMostPurchasedColor = createAsyncThunk("stats/get-color", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IResponseStat[]>(prefix + "/most-purchased-color", payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getAlmostOutStockProduct = createAsyncThunk("stats/almost-out-of-stock", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProduct[]>(prefix + "/almost-out-of-stock", payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getLatestReviews = createAsyncThunk("stats/latest-reviews", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IResponseStat[]>(prefix + "/latest-reviews", payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getMostPurchasedUser = createAsyncThunk("stats/most-orders", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IResponseStat[]>(prefix + "/most-orders", payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteReview = createAsyncThunk("review/delete-reviews", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete<any[]>("/api/client/reviews/admin", payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getTotalRevenue = createAsyncThunk("stats/total-revenue", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IResponseTotalRevenue[]>(prefix + "/total-revenue", payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getOrderStatusCount = createAsyncThunk("stats/order-status-count", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<TResponseOrderStatusCount>(prefix + "/order-counts", payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
