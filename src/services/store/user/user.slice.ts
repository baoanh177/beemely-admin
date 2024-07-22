import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { commonStaticReducers } from "@/services/shared";
import { getAllUsers, getUserById } from "./user.thunk";
import { IUser } from "./user.model";

export interface IUserInitialState extends IInitialState {
  users: IUser[]
  activeUser: IUser | undefined
}

const initialState: IUserInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  filter: {
    page: 1,
    size: 10,
  },
  totalRecords: 0,
  users: [],
  activeUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    ...commonStaticReducers<IUserInitialState>(),
  },
  extraReducers(builder) {
    // ? Get all users
    builder
      .addCase(getAllUsers.fulfilled, (state, { payload }: PayloadAction<IResponse<IUser[]>>) => {
        state.users = payload.metaData
        state.totalRecords = payload.totalDocs!
      })
    // ? Get user by id
    builder
      .addCase(getUserById.fulfilled, (state, { payload }: PayloadAction<IResponse<IUser>>) => {
        state.activeUser = payload.metaData
      })
  },
});
export const { setFilter, resetStatus } = userSlice.actions;
export { userSlice };
