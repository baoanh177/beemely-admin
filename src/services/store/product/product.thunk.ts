import { client } from "@/services/config/client";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "./product.model";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: { [key in keyof Omit<IProduct, "id">]: string | number | any } = {
  name: "product 6",
  slug: "product-6",
  description: "description",
  regularPrice: 22,
  discountPrice: 10,
  thumbnail: "product thumb",
  images: ["image 01", "image 02"],
  tags: [],
  gender: {
    id: "669a0f2922d845db49664259",
    name: "Other",
  },
  variants: [
    {
      id: "66b379480911194fead18eb6",
      color: {
        id: "66b0f71d158d4e5fd613361c",
        name: "White",
        value: "#FFFFFF",
      },
      stock: 222,
      price: 12,
      size: null,
    },
    {
      id: "66b379480911194fead18eb7",
      color: null,
      stock: 456,
      price: 123,
      size: null,
    },
    {
      id: "66b379480911194fead18eb8",
      color: {
        id: "66a8e9a74df2b4ab82aa8fc0",
        name: "Pink",
        value: "#FFB6C1",
      },
      stock: 456,
      price: 123,
      size: null,
    },
  ],
  labels: ["label 1"],
  brand: null,
  productColors: [
    {
      id: "66b379480911194fead18eb3",
      colorId: null,
      imageUrl: "image url",
    },
    {
      id: "66b379480911194fead18eb4",
      colorId: null,
      imageUrl: "image url",
    },
    {
      id: "66b379480911194fead18eb5",
      colorId: {
        id: "66a8e9a74df2b4ab82aa8fc0",
        name: "Pink",
        value: "#FFB6C1",
      },
      imageUrl: "image url",
    },
  ],
  productSizes: [],
  productType: "66a8f79b58de8799c0b1a812",
  status: 1,
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

export const deleteProduct = createAsyncThunk("product/delete-product", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete<IProduct>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
