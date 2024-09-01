import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductType } from "./productType.model";
import { createProductType, deleteProductType, getAllProductTypes, getProductTypeById, updateProductType } from "./productType.thunk";

export interface IProductTypeInitialState extends IInitialState {
  productTypes: IProductType[];
  activeProductType: IProductType | undefined;
}

const initialState: IProductTypeInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  productTypes: [],
  activeProductType: undefined,
  totalRecords: 0,
  filter: {
    _limit: 10,
    _page: 1,
  },
};

const productTypeSlice = createSlice({
  name: "productType",
  initialState,
  reducers: {
    ...commonStaticReducers<IProductTypeInitialState>(),
  },
  extraReducers(builder) {
    // Get all product types
    builder.addCase(getAllProductTypes.fulfilled, (state, { payload }: PayloadAction<IResponse<IProductType[]>>) => {
      state.productTypes = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // Get product type by id
    builder.addCase(getProductTypeById.fulfilled, (state, { payload }: PayloadAction<IResponse<IProductType>>) => {
      state.activeProductType = payload.metaData;
    });
    // Create product type
    builder
      .addCase(createProductType.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createProductType.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Created successfully";
      })
      .addCase(createProductType.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Update product type
    builder
      .addCase(updateProductType.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateProductType.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.productTypes = state.productTypes.map((productType) => (productType.id === payload.metaData.id ? payload.metaData : productType));
        state.status = EFetchStatus.FULFILLED;
        state.message = "Updated successfully";
      })
      .addCase(updateProductType.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Delete product type
    builder
      .addCase(deleteProductType.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteProductType.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Deleted successfully";
        state.productTypes = state.productTypes.filter((productType) => productType.id !== payload);
      })
      .addCase(deleteProductType.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = productTypeSlice.actions;
export { productTypeSlice };
