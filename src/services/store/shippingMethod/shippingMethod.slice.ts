import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShippingMethod } from "./shippingMethod.model";
import {
  getShippingMethodById,
  getAllShippingMethod,
  createShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
} from "./shippingMethod.thunk";

export interface IShippingMethodInitialState extends IInitialState {
  shippingMethod: IShippingMethod[];
  activeShippingMethod: IShippingMethod | undefined;
}

const initialState: IShippingMethodInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  shippingMethod: [],
  activeShippingMethod: undefined,
  totalRecords: 0,
  filter: {
    _limit: 10,
    _page: 1,
  },
};

const shippingMethodSlice = createSlice({
  name: "appShippingMethod",
  initialState,
  reducers: {
    ...commonStaticReducers<IShippingMethodInitialState>(),
  },
  extraReducers(builder) {
    // ? Get all Shipping Method
    builder.addCase(getAllShippingMethod.fulfilled, (state, { payload }: PayloadAction<IResponse<IShippingMethod[]>>) => {
      state.shippingMethod = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // ? Get Shipping Method by id
    builder.addCase(getShippingMethodById.fulfilled, (state, { payload }: PayloadAction<IResponse<IShippingMethod>>) => {
      state.activeShippingMethod = payload.metaData;
    });
    // ? Create Shipping Method
    builder
      .addCase(createShippingMethod.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createShippingMethod.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới thành công";
      })
      .addCase(createShippingMethod.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Update Shipping Method
    builder
      .addCase(updateShippingMethod.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateShippingMethod.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateShippingMethod.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    // ? Delete Shipping Method
    builder
      .addCase(deleteShippingMethod.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteShippingMethod.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.shippingMethod = state.shippingMethod.filter((item) => item.id !== payload);
      })
      .addCase(deleteShippingMethod.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = shippingMethodSlice.actions;
export { shippingMethodSlice };
