import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IPaymentStatus } from "./paymentStatus.model";
import {
  createPaymentStatus,
  deletePaymentStatus,
  getAllPaymentStatuses,
  getPaymentStatusById,
  updatePaymentStatus,
} from "./paymentStatus.thunk";

export interface IPaymentStatusInitialState extends IInitialState {
  paymentStatuses: IPaymentStatus[];
  activePaymentStatus: IPaymentStatus | undefined;
}

const initialState: IPaymentStatusInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  paymentStatuses: [],
  activePaymentStatus: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const paymentStatuslice = createSlice({
  name: "paymentStatus",
  initialState,
  reducers: {
    ...commonStaticReducers<IPaymentStatusInitialState>(),
  },
  extraReducers(builder) {
    builder.addCase(getAllPaymentStatuses.fulfilled, (state, { payload }: PayloadAction<IResponse<IPaymentStatus[]>>) => {
      state.paymentStatuses = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });

    builder.addCase(getPaymentStatusById.fulfilled, (state, { payload }: PayloadAction<IResponse<IPaymentStatus>>) => {
      state.activePaymentStatus = payload.metaData;
    });

    builder
      .addCase(createPaymentStatus.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createPaymentStatus.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới thành công";
      })
      .addCase(createPaymentStatus.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(updatePaymentStatus.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updatePaymentStatus.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updatePaymentStatus.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(deletePaymentStatus.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deletePaymentStatus.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.paymentStatuses = state.paymentStatuses.filter((paymentStatus) => paymentStatus.id !== payload);
      })
      .addCase(deletePaymentStatus.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = paymentStatuslice.actions;
export { paymentStatuslice };
