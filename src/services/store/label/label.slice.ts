import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILabel } from "./label.model";
import { createLabel, deleteLabel, getAllLabels, getLabelById, updateLabel } from "./label.thunk";

export interface ILabelInitialState extends IInitialState {
  labels: ILabel[];
  activeLabel: ILabel | undefined;
}

const initialState: ILabelInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  labels: [],
  activeLabel: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const labelSlice = createSlice({
  name: "label",
  initialState,
  reducers: {
    ...commonStaticReducers<ILabelInitialState>(),
  },
  extraReducers(builder) {
    // ? Get all labels
    builder.addCase(getAllLabels.fulfilled, (state, { payload }: PayloadAction<IResponse<ILabel[]>>) => {
      state.labels = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // ? Get label by id
    builder.addCase(getLabelById.fulfilled, (state, { payload }: PayloadAction<IResponse<ILabel>>) => {
      state.activeLabel = payload.metaData;
    });
    // ? Create label
    builder
      .addCase(createLabel.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createLabel.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Created successfully";
      })
      .addCase(createLabel.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Update label
    builder
      .addCase(updateLabel.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateLabel.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.labels = state.labels.map((label) => (label.id === payload.metaData.id ? payload.metaData : label));
        state.status = EFetchStatus.FULFILLED;
        state.message = "Updated successfully";
      })
      .addCase(updateLabel.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Delete label
    builder
      .addCase(deleteLabel.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteLabel.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Deleted successfully";
        state.labels = state.labels.filter((label) => label.id !== payload);
      })
      .addCase(deleteLabel.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = labelSlice.actions;
export { labelSlice };
