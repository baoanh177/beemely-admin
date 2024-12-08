import { commonStaticReducers } from "@/services/shared";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/status";
import { IOrder, IOrderLog } from "./order.model";
import { createOrder, deleteOrder, getAllOrder, getOrderById, getOrderLogsByOrderId, updateOrder } from "./order.thunk";

export interface IOrderInitialState extends IInitialState {
  orders: IOrder[];
  activeOrder: IOrder | undefined;
  logs: IOrderLog[];
}

const initialState: IOrderInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  orders: [],
  logs: [],
  activeOrder: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    ...commonStaticReducers<IOrderInitialState>(),
  },
  extraReducers(builder) {
    builder.addCase(getAllOrder.fulfilled, (state, { payload }: PayloadAction<IResponse<IOrder[]>>) => {
      state.orders = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });

    builder.addCase(getOrderById.fulfilled, (state, { payload }: PayloadAction<IResponse<IOrder>>) => {
      state.activeOrder = payload.metaData;
    });

    builder.addCase(getOrderLogsByOrderId.fulfilled, (state, { payload }: PayloadAction<IResponse<IOrderLog[]>>) => {
      state.logs = payload.metaData;
    });

    builder
      .addCase(createOrder.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới thành công";
      })
      .addCase(createOrder.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(updateOrder.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateOrder.fulfilled, (state, { payload }: PayloadAction<IResponse<IOrder>>) => {
        state.orders = state.orders.map((order) => (order.id === payload.metaData.id ? payload.metaData : order));
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateOrder.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.errors.message || "Không thể cập nhật trạng thái đơn hàng";
      });

    builder
      .addCase(deleteOrder.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.orders = state.orders.filter((order) => order.id !== payload);
      })
      .addCase(deleteOrder.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = orderSlice.actions;
export { orderSlice };
