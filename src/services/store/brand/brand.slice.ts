import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBrand } from "./brand.model";
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "./brand.thunk";

export interface IBrandInitialState extends IInitialState {
  brands: IBrand[];
  activeBrand: IBrand | undefined;
}

const initialState: IBrandInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  brands: [],
  activeBrand: undefined,
  totalRecords: 0,
  filter: {
    _limit: 10,
    _page: 1,
  },
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    ...commonStaticReducers<IBrandInitialState>(),
  },
  extraReducers(builder) {
    // ? Get all brands
    builder.addCase(getAllBrands.fulfilled, (state, { payload }: PayloadAction<IResponse<IBrand[]>>) => {
      state.brands = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // ? Get brand by id
    builder.addCase(getBrandById.fulfilled, (state, { payload }: PayloadAction<IResponse<IBrand>>) => {
      state.activeBrand = payload.metaData;
    });
    // ? Create brand
    builder
      .addCase(createBrand.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới thành công";
      })
      .addCase(createBrand.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Update brand
    builder
      .addCase(updateBrand.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateBrand.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateBrand.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    // ? Delete brand
    builder
      .addCase(deleteBrand.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteBrand.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.brands = state.brands.filter((brand) => brand.id !== payload);
      })
      .addCase(deleteBrand.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.errors.message || "Không thể xóa tag";
      });
  },
});

export const { resetStatus, setFilter } = brandSlice.actions;
export { brandSlice };
