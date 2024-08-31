import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IFlagPage } from "./flagPage.model";
import { createFlagPage, deleteFlagPage, getAllFlagPage, getFlagPageById, updateFlagPage } from "./flagPage.thunk";

export interface IFlagPageInitialState extends IInitialState {
  flagPages: IFlagPage[];
  activeFlagPage?: IFlagPage;
}

const initialState: IFlagPageInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  flagPages: [],
  activeFlagPage: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const flagPageSlice = createSlice({
  name: "flagPage",
  initialState,
  reducers: {
    ...commonStaticReducers<IFlagPageInitialState>(),
  },
  extraReducers(builder) {
    builder.addCase(getAllFlagPage.fulfilled, (state, { payload }: PayloadAction<IResponse<IFlagPage[]>>) => {
      state.flagPages = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });

    builder.addCase(getFlagPageById.fulfilled, (state, { payload }: PayloadAction<IResponse<IFlagPage>>) => {
      state.activeFlagPage = payload.metaData;
    });

    builder
      .addCase(createFlagPage.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createFlagPage.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới thành công";
      })
      .addCase(createFlagPage.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(updateFlagPage.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateFlagPage.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateFlagPage.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(deleteFlagPage.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteFlagPage.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.flagPages = state.flagPages.filter((flagPage) => flagPage.id !== payload);
      })
      .addCase(deleteFlagPage.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = flagPageSlice.actions;
export { flagPageSlice };
