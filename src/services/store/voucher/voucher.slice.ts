import { commonStaticReducers } from "@/services/shared";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/status";
import { IVoucher } from "./voucher.model";
import { createVoucher, deleteVoucher, getAllVouchers, getVoucherById, updateVoucher } from "./voucher.thunk";

export interface IVoucherInitialState extends IInitialState {
  vouchers: IVoucher[];
  activeVoucher: IVoucher | undefined;
}

const initialState: IVoucherInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  vouchers: [],
  activeVoucher: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    ...commonStaticReducers<IVoucherInitialState>(),
  },
  extraReducers(builder) {
    builder.addCase(getAllVouchers.fulfilled, (state, { payload }: PayloadAction<IResponse<IVoucher[]>>) => {
      state.vouchers = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });

    builder.addCase(getVoucherById.fulfilled, (state, { payload }: PayloadAction<IResponse<IVoucher>>) => {
      state.activeVoucher = payload.metaData;
    });

    builder
      .addCase(createVoucher.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createVoucher.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo thành công";
      })
      .addCase(createVoucher.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(updateVoucher.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateVoucher.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.vouchers = state.vouchers.map((voucher) => (voucher.id === payload.metaData.id ? payload.metaData : voucher));

        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateVoucher.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(deleteVoucher.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteVoucher.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.vouchers = state.vouchers.filter((voucher) => voucher.id !== payload);
      })
      .addCase(deleteVoucher.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = voucherSlice.actions;
export { voucherSlice };
