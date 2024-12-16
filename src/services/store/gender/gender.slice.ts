import { commonStaticReducers } from "@/services/shared";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createGender, deleteGender, getAllGenders, getGenderById, updateGender } from "./gender.thunk";
import { EFetchStatus } from "@/shared/enums/status";
import { IGender } from "./gender.model";

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
    builder.addCase(getAllGenders.fulfilled, (state, { payload }: PayloadAction<IResponse<IGender[]>>) => {
      state.genders = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });

    builder.addCase(getGenderById.fulfilled, (state, { payload }: PayloadAction<IResponse<IGender>>) => {
      state.activeGender = payload.metaData;
    });

    builder
      .addCase(createGender.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createGender.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo thành công";
      })
      .addCase(createGender.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(updateGender.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateGender.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateGender.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(deleteGender.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteGender.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.genders = state.genders.filter((gender) => gender.id !== payload);
      })
      .addCase(deleteGender.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.errors.message || "Không thể xóa gender này";
      });
  },
});

export const { resetStatus, setFilter } = genderSlice.actions;
export { genderSlice };
