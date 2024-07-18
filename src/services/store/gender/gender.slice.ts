import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IGender } from "./gender.model";
import { createGender, deleteGender, getAllGenders, getGenderById, updateGender } from "./gender.thunk";

export interface IGenderInitialState extends IInitialState {
  genders: IGender[];
  activeGender: IGender | undefined;
}

const initialState: IGenderInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  genders: [],
  activeGender: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    ...commonStaticReducers<IGenderInitialState>(),
  },
  extraReducers(builder) {
    // Get all genders
    builder.addCase(getAllGenders.fulfilled, (state, { payload }: PayloadAction<IResponse<IGender[]>>) => {
      state.genders = payload.metaData;
    });
    // Get gender by id
    builder.addCase(getGenderById.fulfilled, (state, { payload }: PayloadAction<IResponse<IGender>>) => {
      state.activeGender = payload.metaData;
    });
    // Create gender
    builder
      .addCase(createGender.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createGender.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Created successfully";
      })
      .addCase(createGender.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // Update gender
    builder
      .addCase(updateGender.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateGender.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Updated successfully";
      })
      .addCase(updateGender.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // Delete gender
    builder
      .addCase(deleteGender.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteGender.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Deleted successfully";
        state.genders = state.genders.filter((gender) => gender.id !== payload);
      })
      .addCase(deleteGender.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus, setFilter } = genderSlice.actions;
export { genderSlice };
