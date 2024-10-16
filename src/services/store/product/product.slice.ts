import { EFetchStatus } from "@/shared/enums/status";
import { IProduct, IProductInitialState } from "./product.model";
import { commonStaticReducers } from "@/services/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponse } from "@/shared/utils/shared-interfaces";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./product.thunk";

const initialState: IProductInitialState = {
  products: [],
  activeProduct: undefined,
  filter: {
    _page: 1,
    _limit: 10,
  },
  totalRecords: 0,
  message: "",
  status: EFetchStatus.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ...commonStaticReducers<IProductInitialState>(),
  },
  extraReducers: (builder) => {
    // ? Get all products
    builder.addCase(getAllProducts.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct[]>>) => {
      state.products = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // ? Get product by id
    builder.addCase(getProductById.fulfilled, (state, { payload }: PayloadAction<IResponse<IProduct>>) => {
      state.activeProduct = payload.metaData;
    });
    // ? Create product
    builder.addCase(createProduct.pending, (state) => {
      state.status = EFetchStatus.PENDING;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.status = EFetchStatus.FULFILLED;
      state.message = "Tạo mới thành công";
    });
    builder.addCase(createProduct.rejected, (state, { payload }: PayloadAction<any>) => {
      state.status = EFetchStatus.REJECTED;
      state.message = payload.message;
    });
    // ? Update product
    builder.addCase(updateProduct.pending, (state) => {
      state.status = EFetchStatus.PENDING;
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.products = state.products.map((prod) => (prod.id === payload.metaData.id ? payload.metaData : prod));
      state.status = EFetchStatus.FULFILLED;
      state.message = "Cập nhật thành công";
    });
    builder.addCase(updateProduct.rejected, (state, { payload }: PayloadAction<any>) => {
      state.status = EFetchStatus.REJECTED;
      state.message = payload.message;
    });
    // ? Delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.status = EFetchStatus.PENDING;
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.products = state.products.filter((prod) => prod.id !== payload);
      state.status = EFetchStatus.FULFILLED;
      state.message = "Xóa thành công";
    });
    builder.addCase(deleteProduct.rejected, (state, { payload }: PayloadAction<any>) => {
      state.status = EFetchStatus.REJECTED;
      state.message = payload.message;
    });
  },
});

export const { resetStatus, setFilter } = productSlice.actions;
export { productSlice };
