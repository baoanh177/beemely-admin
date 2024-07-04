import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthActions } from "@/shared/enums/authActions";
import { FetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { login } from "../reducers/auth.reducer";
import { ILoginResponseData } from "@/shared/models/auth.model";

const accessToken = localStorage.getItem("accessToken");

export interface IAuthInitialState extends Partial<IInitialState> {
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
  reducers: {
    resetStatus(state) {
      state.status = FetchStatus.IDLE;
      state.message = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.action = AuthActions.LOGIN;
        state.status = FetchStatus.PENDING;
      })
      .addCase(login.fulfilled, (state, { payload }: PayloadAction<IResponse<ILoginResponseData>>) => {
        localStorage.setItem("accessToken", JSON.stringify(payload.metaData?.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(payload.metaData?.refreshToken));
        state.user = payload.metaData?.userData;
        state.status = FetchStatus.FULFILLED;
      })
      .addCase(login.rejected, (state, { payload }: PayloadAction<any>) => {
        state.message = payload.message;
        state.status = FetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = authSlice.actions;
export { authSlice };
