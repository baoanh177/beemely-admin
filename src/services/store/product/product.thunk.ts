import { client } from "@/services/config/client";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "./product.model";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: {
  [key in keyof Omit<IProduct, "id" | "orderCount" | "sortDescription" | "dimensions" | "enableDelete">]: string | number | any;
} = {
  name: "Tên sản phẩm",
  slug: "Đường dẫn",
  description: "Mô tả",
  regularPrice: "Giá bình thường",
  discountPrice: "Giá giảm",
  thumbnail: "Hình thu nhỏ",
  images: "Hình ảnh",
  tags: "Thẻ",
  gender: "Giới tính",
  variants: "Biến thể",
  labels: "Nhãn",
  brand: "Thương hiệu",
  productColors: "Màu sản phẩm",
  productSizes: "Kích thước sản phẩm",
  productType: "Loại sản phẩm",
  status: "Trạng thái",
};

const prefix = "/api/products";

export const getAllProducts = createAsyncThunk("product/getAllProducts", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProduct[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getProductById = createAsyncThunk("product/get-product-by-id", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProduct>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
export const createProduct = createAsyncThunk("product/create-product", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IProduct>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateProduct = createAsyncThunk("product/update-product", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IProduct>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteProduct = createAsyncThunk("product/delete-product", async (payload: IThunkPayload, { rejectWithValue, dispatch }) => {
  try {
    const { response, data } = await client.delete<IProduct>(prefix, payload);
    if (response.status >= 400) {
      return rejectWithValue(messageCreator(data, dataKeys));
    }
    await dispatch(getAllProducts({ query: payload.query }));
    return data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
