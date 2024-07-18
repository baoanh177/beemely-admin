import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ilabel } from "./label.model";
import { createLabel, deleteLabel, getAlllabels, getLabelById, updateLabel } from "./label.thunk";

export interface IlabelInitialState extends IInitialState {
  labels: Ilabel[];
  activeLabel: Ilabel | undefined;
}

const initialState: IlabelInitialState = {
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
    ...commonStaticReducers<IlabelInitialState>(),
  },
  extraReducers(builder) {
    // ? Get all labels
    builder.addCase(getAlllabels.fulfilled, (state, { payload }: PayloadAction<IResponse<Ilabel[]>>) => {
      state.labels = payload.metaData;
    });
    // ? Get label by id
    builder.addCase(getLabelById.fulfilled, (state, { payload }: PayloadAction<IResponse<Ilabel>>) => {
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
      .addCase(createLabel.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // ? Update label
    builder
      .addCase(updateLabel.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateLabel.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Updated successfully";
      })
      .addCase(updateLabel.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
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
      .addCase(deleteLabel.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus, setFilter } = labelSlice.actions;
export { labelSlice };
