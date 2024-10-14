import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { commonStaticReducers } from "@/services/shared";
import { changePassword, createAccount, deleteAccount, getAccountById, getAllAccounts, updateAccount } from "./account.thunk";
import { IAccount } from "./account.model";
import toast from "react-hot-toast";

export interface IAccountInitialState extends IInitialState {
  accounts: IAccount[];
  activeAccount?: IAccount;
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
  activeAccount: undefined
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
    // ? Get account by ID
    builder
      .addCase(getAccountById.fulfilled, (state, { payload }: PayloadAction<IResponse<IAccount>>) => {
        state.activeAccount = payload.metaData
      })
    // ? Create account
    builder
      .addCase(createAccount.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới tài khoản thành công"
      })
      .addCase(createAccount.rejected, (state, { payload }: PayloadAction<any>) => {
        state.message = payload.message
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
        state.message = "Cập nhật tài khoản thành công"
      })
      .addCase(updateAccount.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message
      });
    // ? Delete account
    builder
      .addCase(deleteAccount.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteAccount.fulfilled, (state, { payload }) => {
        state.accounts = state.accounts.filter((acc) => acc.id !== payload);
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa tài khoản thành công"
      })
      .addCase(deleteAccount.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message
      });
    // ? Delete account
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.IDLE;
        toast.success("Thay đổi mật khẩu thành công")
      })
      .addCase(changePassword.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message
      });
  },
});
export const { setFilter, resetStatus } = accountSlice.actions;
export { accountSlice };
