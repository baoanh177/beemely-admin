import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { commonStaticReducers } from "@/services/shared";
import { createAccount, deleteAccount, getAllAccounts, updateAccount } from "./account.thunk";
import { IAccount } from "./account.model";

export interface IAccountInitialState extends IInitialState {
  accounts: IAccount[];
}

const initialState: IAccountInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  filter: {
    _page: 1,
    _limit: 10,
  },
  totalRecords: 0,
  accounts: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    ...commonStaticReducers<IAccountInitialState>(),
  },
  extraReducers(builder) {
    // ? Get all accounts
    builder.addCase(getAllAccounts.fulfilled, (state, { payload }: PayloadAction<IResponse<IAccount[]>>) => {
      state.accounts = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // ? Create account
    builder
      .addCase(createAccount.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(createAccount.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // ? Update account
    builder
      .addCase(updateAccount.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateAccount.fulfilled, (state, { payload }) => {
        state.accounts = state.accounts.map((acc) => (acc.id === payload.metaData.id ? payload.metaData : acc));
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(updateAccount.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // ? Delete account
    builder
      .addCase(deleteAccount.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteAccount.fulfilled, (state, { payload }) => {
        state.accounts = state.accounts.filter((acc) => acc.id !== payload);
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
  },
});
export const { setFilter, resetStatus } = accountSlice.actions;
export { accountSlice };
