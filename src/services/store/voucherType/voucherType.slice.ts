import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IVoucherType } from "./voucherType.model";
import { createVoucherType, deleteVoucherType, getAllVoucherTypes, getVoucherTypeByid, updateVoucherType } from "./voucherType.thunk";

export interface IVoucherTypeInitialState extends IInitialState {
  voucherTypes: IVoucherType[];
  activeVoucherType?: IVoucherType;
}

const initialState: IVoucherTypeInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  voucherTypes: [],
  activeVoucherType: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const voucherTypeSlice = createSlice({
  name: "voucherType",
  initialState,
  reducers: {
    ...commonStaticReducers<IVoucherTypeInitialState>(),
  },
  extraReducers(builder) {
    // Get all voucherTypes
    builder.addCase(getAllVoucherTypes.fulfilled, (state, { payload }: PayloadAction<IResponse<IVoucherType[]>>) => {
      state.voucherTypes = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // Get voucherType by id
    builder.addCase(getVoucherTypeByid.fulfilled, (state, { payload }: PayloadAction<IResponse<IVoucherType>>) => {
      state.activeVoucherType = payload.metaData;
    });
    // Create voucherType
    builder
      .addCase(createVoucherType.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createVoucherType.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới thành công";
      })
      .addCase(createVoucherType.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Update voucherType
    builder
      .addCase(updateVoucherType.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateVoucherType.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateVoucherType.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Delete voucherType
    builder
      .addCase(deleteVoucherType.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteVoucherType.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.voucherTypes = state.voucherTypes.filter((voucherType) => voucherType.id !== payload);
      })
      .addCase(deleteVoucherType.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = voucherTypeSlice.actions;
export { voucherTypeSlice };
