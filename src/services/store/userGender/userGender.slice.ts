import { commonStaticReducers } from "@/services/shared";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserGender, deleteUserGender, getAllUserGenders, getUserGenderById, updateUserGender } from "./userGender.thunk";
import { EFetchStatus } from "@/shared/enums/status";
import { IUserGender } from "./userGender.model";

export interface IUserGenderInitialState extends IInitialState {
  userGenders: IUserGender[];
  activeUserGender: IUserGender | undefined;
}

const initialState: IUserGenderInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  userGenders: [],
  activeUserGender: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const userGenderSlice = createSlice({
  name: "userGender",
  initialState,
  reducers: {
    ...commonStaticReducers<IUserGenderInitialState>(),
  },
  extraReducers(builder) {
    builder.addCase(getAllUserGenders.fulfilled, (state, { payload }: PayloadAction<IResponse<IUserGender[]>>) => {
      state.userGenders = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });

    builder.addCase(getUserGenderById.fulfilled, (state, { payload }: PayloadAction<IResponse<IUserGender>>) => {
      state.activeUserGender = payload.metaData;
    });

    builder
      .addCase(createUserGender.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createUserGender.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo thành công";
      })
      .addCase(createUserGender.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(updateUserGender.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateUserGender.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateUserGender.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });

    builder
      .addCase(deleteUserGender.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteUserGender.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.userGenders = state.userGenders.filter((userGender) => userGender.id !== payload);
      })
      .addCase(deleteUserGender.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = userGenderSlice.actions;
export { userGenderSlice };
