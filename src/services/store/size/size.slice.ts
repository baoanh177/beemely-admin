import { commonStaticReducers } from "@/services/shared";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISize } from "./size.model";
import { createSize, deleteSize, getAllSizes, getSizeById, updateSize } from "./size.thunk";
import { EFetchStatus } from "@/shared/enums/status";
import { ICategory } from "../category/category.model";

export interface ISizeInitialState extends IInitialState {
  sizes: ISize[];
  activeSize: ISize | undefined;
  categories: ICategory[];
}
const initialState: ISizeInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  sizes: [],
  activeSize: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
  categories: [],
};

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    ...commonStaticReducers<ISizeInitialState>(),
  },
  extraReducers(builder) {
    // Get all sizes
    builder.addCase(getAllSizes.fulfilled, (state, { payload }: PayloadAction<IResponse<ISize[]>>) => {
      state.sizes = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // Get size by id
    builder.addCase(getSizeById.fulfilled, (state, { payload }: PayloadAction<IResponse<ISize>>) => {
      state.activeSize = payload.metaData;
    });
    // Create size
    builder
      .addCase(createSize.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createSize.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo thành công";
      })
      .addCase(createSize.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Update size
    builder
      .addCase(updateSize.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateSize.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateSize.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Delete size
    builder
      .addCase(deleteSize.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteSize.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.sizes = state.sizes.filter((size) => size.id !== payload);
      })
      .addCase(deleteSize.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.errors.message || "Không thể xóa kích cỡ";
      });
  },
});

export const { resetStatus, setFilter } = sizeSlice.actions;
export { sizeSlice };
