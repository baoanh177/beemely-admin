import { commonStaticReducers } from "@/services/shared";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IColor } from "./color.model";
import { createColor, deleteColor, getAllColors, getColorById, updateColor } from "./color.thunk";
import { EFetchStatus } from "@/shared/enums/status";

export interface IColorInitialState extends IInitialState {
  colors: IColor[];
  activeColor: IColor | undefined;
}

const initialState: IColorInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  colors: [],
  activeColor: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    ...commonStaticReducers<IColorInitialState>(),
  },
  extraReducers(builder) {
    // Get all colors
    builder.addCase(getAllColors.fulfilled, (state, { payload }: PayloadAction<IResponse<IColor[]>>) => {
      state.colors = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // Get color by id
    builder.addCase(getColorById.fulfilled, (state, { payload }: PayloadAction<IResponse<IColor>>) => {
      state.activeColor = payload.metaData;
    });
    // Create color
    builder
      .addCase(createColor.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createColor.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Created successfully";
      })
      .addCase(createColor.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Update color
    builder
      .addCase(updateColor.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateColor.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Updated successfully";
      })
      .addCase(updateColor.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Delete color
    builder
      .addCase(deleteColor.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteColor.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Deleted successfully";
        state.colors = state.colors.filter((color) => color.id !== payload);
      })
      .addCase(deleteColor.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = colorSlice.actions;
export { colorSlice };
