import { createSlice } from "@reduxjs/toolkit";

import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState } from "@/shared/utils/shared-interfaces";
import { commonStaticReducers } from "@/services/shared";

export interface IAccountInitialState extends IInitialState {}

const initialState: IAccountInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  filter: {
    page: 1,
    size: 10,
  },
  totalRecords: 50,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    ...commonStaticReducers<IAccountInitialState>(),
  },
});
export const { setFilter } = accountSlice.actions;
export { accountSlice };
