import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { getProfile, login, logout } from "./auth.thunk";
import { ILoginResponseData, IUserProfile } from "./auth.model";

export interface IAuthInitialState extends Partial<IInitialState> {
  isLogin: boolean;
  profile: IUserProfile | null;
  loginTime: number;
}

const initialState: IAuthInitialState = {
  isLogin: false,
  profile: null,
  loginTime: 0,
  status: EFetchStatus.IDLE,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
  },

  extraReducers(builder) {
    // ? Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(getProfile.fulfilled, (state, { payload }: PayloadAction<IResponse<IUserProfile>>) => {
        state.profile = payload.metaData;
        state.isLogin = true;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(getProfile.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // ? Login
    builder
      .addCase(login.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(login.fulfilled, (state, { payload }: PayloadAction<IResponse<ILoginResponseData>>) => {
        localStorage.setItem("accessToken", JSON.stringify(payload.metaData?.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(payload.metaData?.refreshToken));
        state.loginTime = new Date().getTime() / 1000;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(login.rejected, (state, { payload }: PayloadAction<any>) => {
        state.message = payload?.message;
        state.status = EFetchStatus.REJECTED;
      });
    // ? Logout
    builder
      .addCase(logout.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        state.isLogin = false;
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(logout.rejected, (state, { payload }: PayloadAction<any>) => {
        state.message = payload?.message;
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus } = authSlice.actions;
export { authSlice };
