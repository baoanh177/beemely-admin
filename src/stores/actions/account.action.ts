import { FetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState } from "@/shared/utils/shared-interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface IAccountInitialState extends IInitialState {}

const initialState: IAccountInitialState = {
  status: FetchStatus.IDLE,
  message: "",
  filter: {
    page: 1,
    size: 10,
  },
  totalRecords: 50,
};

const accountSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});
export const { setFilter } = accountSlice.actions;
export { accountSlice };
