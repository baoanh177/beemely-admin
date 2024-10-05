import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBanner } from "./banner.model";
import { createBanner, deleteBanner, getAllBanners, getBannerById, updateBanner } from "./banner.thunk";

export interface IBannerInitialState extends IInitialState {
  banners: IBanner[];
  activeBanner: IBanner | undefined;
}

const initialState: IBannerInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  banners: [],
  activeBanner: undefined,
  totalRecords: 0,
  filter: {
    _limit: 10,
    _page: 1,
  },
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    ...commonStaticReducers<IBannerInitialState>(),
  },
  extraReducers(builder) {
    // Get all banners
    builder.addCase(getAllBanners.fulfilled, (state, { payload }: PayloadAction<IResponse<IBanner[]>>) => {
      state.banners = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // Get banner by id
    builder.addCase(getBannerById.fulfilled, (state, { payload }: PayloadAction<IResponse<IBanner>>) => {
      state.activeBanner = payload.metaData;
    });
    // Create banner
    builder
      .addCase(createBanner.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createBanner.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Created successfully";
      })
      .addCase(createBanner.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Update banner
    builder
      .addCase(updateBanner.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateBanner.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Updated successfully";
      })
      .addCase(updateBanner.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Delete banner
    builder
      .addCase(deleteBanner.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteBanner.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Deleted successfully";
        state.banners = state.banners.filter((banner) => banner.id !== payload);
      })
      .addCase(deleteBanner.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = bannerSlice.actions;
export { bannerSlice };
