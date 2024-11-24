import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseStat, IResponseTotalRevenue, TResponseOrderStatusCount } from "./stat.model";
import {
  getAlmostOutStockProduct,
  getLatestReviews,
  getMostPurchasedColor,
  getMostPurchasedSize,
  getOrderStatusCount,
  getTotalRevenue,
} from "./stats.thunk";

export interface IStatsInitialState extends IInitialState {
  sizes: IResponseStat[];
  colors: IResponseStat[];
  orderCount: TResponseOrderStatusCount;
  products: any[];
  reviews: any[];
  totalRevenues: IResponseTotalRevenue[];
}

const initialState: IStatsInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  sizes: [],
  products: [],
  colors: [],
  reviews: [],
  totalRevenues: [],
  orderCount: {} as TResponseOrderStatusCount,
  totalRecords: 0,
  filter: {
    _limit: 10,
    _page: 1,
  },
};

const statSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    ...commonStaticReducers<IStatsInitialState>(),
  },
  extraReducers(builder) {
    // ? Get most sizes
    builder.addCase(getMostPurchasedSize.fulfilled, (state, { payload }: PayloadAction<IResponse<IResponseStat[]>>) => {
      state.sizes = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // ? Get most colors
    builder.addCase(getMostPurchasedColor.fulfilled, (state, { payload }: PayloadAction<IResponse<IResponseStat[]>>) => {
      state.colors = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    builder.addCase(getAlmostOutStockProduct.fulfilled, (state, { payload }: PayloadAction<IResponse<IResponseStat[]>>) => {
      state.products = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    builder.addCase(getLatestReviews.fulfilled, (state, { payload }: PayloadAction<IResponse<IResponseStat[]>>) => {
      state.reviews = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    builder.addCase(getTotalRevenue.fulfilled, (state, { payload }: PayloadAction<IResponse<IResponseTotalRevenue[]>>) => {
      state.totalRevenues = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    builder.addCase(getOrderStatusCount.fulfilled, (state, { payload }: PayloadAction<IResponse<TResponseOrderStatusCount>>) => {
      state.orderCount = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
  },
});

export const { resetStatus, setFilter } = statSlice.actions;
export { statSlice };
