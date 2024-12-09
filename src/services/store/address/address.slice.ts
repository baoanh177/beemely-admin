import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAddress, deleteAddress, updateAddress } from "./address.thunk";

export interface IAddressInitialState extends IInitialState {}

const initialState: IAddressInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  filter: {
    _page: 1,
    _limit: 10,
  },
  totalRecords: 0,
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    ...commonStaticReducers<IAddressInitialState>(),
  },
  extraReducers(builder) {
    // ? Create account
    builder
      .addCase(createAddress.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createAddress.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới địa chỉ thành công";
      })
      .addCase(createAddress.rejected, (state, { payload }: PayloadAction<any>) => {
        state.message = payload.message;
        state.status = EFetchStatus.REJECTED;
      });
    // ? Update account
    builder
      .addCase(updateAddress.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật địa chỉ thành công";
      })
      .addCase(updateAddress.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Delete account
    builder
      .addCase(deleteAddress.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa địa chỉ thành công";
      })
      .addCase(deleteAddress.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { setFilter, resetStatus } = addressSlice.actions;
export { addressSlice };
