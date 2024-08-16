import { commonStaticReducers } from "@/services/shared";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrderStatus, deleteOrderStatus, getAllOrderStatuses, getOrderStatusById, updateOrderStatus } from "./orderStatus.thunk";
import { EFetchStatus } from "@/shared/enums/status";
import { IOrderStatus } from "./orderStatus.model";

export interface IOrderStatusInitialState extends IInitialState {
  orderStatuses: IOrderStatus[];
  activeOrderStatus: IOrderStatus | undefined;
}

const initialState: IOrderStatusInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  orderStatuses: [],
  activeOrderStatus: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const orderStatusSlice = createSlice({
  name: "orderStatus",
  initialState,
  reducers: {
    ...commonStaticReducers<IOrderStatusInitialState>(),
  },
  extraReducers(builder) {
    builder.addCase(getAllOrderStatuses.fulfilled, (state, { payload }: PayloadAction<IResponse<IOrderStatus[]>>) => {
      state.orderStatuses = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });

    builder.addCase(getOrderStatusById.fulfilled, (state, { payload }: PayloadAction<IResponse<IOrderStatus>>) => {
      state.activeOrderStatus = payload.metaData;
    });

    builder
      .addCase(createOrderStatus.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createOrderStatus.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới thành công";
      })
      .addCase(createOrderStatus.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateOrderStatus.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(deleteOrderStatus.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteOrderStatus.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.orderStatuses = state.orderStatuses.filter((orderStatus) => orderStatus.id !== payload);
      })
      .addCase(deleteOrderStatus.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = orderStatusSlice.actions;
export { orderStatusSlice };
