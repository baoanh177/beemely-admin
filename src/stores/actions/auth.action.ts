import { createSlice } from "@reduxjs/toolkit";

import { AuthActions } from "@/shared/enums/authActions";
import { FetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState } from "@/shared/utils/shared-interfaces";

const accessToken = localStorage.getItem("accessToken");

interface IAuthInitialState extends Partial<IInitialState> {
  isLogin: boolean;
  user: unknown;
  action: AuthActions;
}

const initialState: IAuthInitialState = {
  isLogin: !!accessToken,
  user: null,
  status: FetchStatus.IDLE,
  message: "",
  action: AuthActions.UNSET,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers() {},
});

export { authSlice };
