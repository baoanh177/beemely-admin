import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IPaymentType } from "./paymentType.model";
import { createPaymentType, deletePaymentType, getAllPaymentTypes, getPaymentTypeById, updatePaymentType } from "./paymentType.thunk";

export interface IPaymentTypeInitialState extends IInitialState {
  paymentTypes: IPaymentType[];
  activePaymentType: IPaymentType | undefined;
}

const initialState: IPaymentTypeInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  paymentTypes: [],
  activePaymentType: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const paymentTypeSlice = createSlice({
  name: "paymentType",
  initialState,
  reducers: {
    ...commonStaticReducers<IPaymentTypeInitialState>(),
  },
  extraReducers(builder) {
    builder.addCase(getAllPaymentTypes.fulfilled, (state, { payload }: PayloadAction<IResponse<IPaymentType[]>>) => {
      state.paymentTypes = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });

    builder.addCase(getPaymentTypeById.fulfilled, (state, { payload }: PayloadAction<IResponse<IPaymentType>>) => {
      state.activePaymentType = payload.metaData;
    });

    builder
      .addCase(createPaymentType.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createPaymentType.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới thành công";
      })
      .addCase(createPaymentType.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(updatePaymentType.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updatePaymentType.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updatePaymentType.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(deletePaymentType.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deletePaymentType.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.paymentTypes = state.paymentTypes.filter((paymentType) => paymentType.id !== payload);
      })
      .addCase(deletePaymentType.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = paymentTypeSlice.actions;
export { paymentTypeSlice };
