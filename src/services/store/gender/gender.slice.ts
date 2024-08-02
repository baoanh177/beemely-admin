import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { IGender } from "./gender.model";
import { createGender, deleteGender, getAllGenders, getGenderById, searchGenders, updateGender } from "./gender.thunk";

export interface IGenderInitialState extends IInitialState {
  genders: IGender[];
  activeGender: IGender | undefined;
  searchQuery: string;
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
  searchQuery: "",
};

const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    ...commonStaticReducers<IGenderInitialState>(),
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers(builder) {
    // Get all genders
    builder.addCase(getAllGenders.fulfilled, (state, { payload }: PayloadAction<IResponse<IGender[]>>) => {
      state.genders = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // Search genders
    builder.addCase(searchGenders.fulfilled, (state, { payload }: PayloadAction<IResponse<IGender[]>>) => {
      state.genders = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
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
      .addCase(createGender.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
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
      .addCase(updateGender.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
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
      .addCase(deleteGender.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter, setSearchQuery } = genderSlice.actions;
export { genderSlice };
