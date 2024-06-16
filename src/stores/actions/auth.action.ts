import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../reducers/auth.reducer";
import { AuthActions } from "@/shared/enums/authActions";
import { FetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState } from "@/shared/utils/shared-interfaces";

const accessToken = localStorage.getItem("accessToken");

interface IAuthInitialState extends Partial<IInitialState> {
  isLogin: boolean
  user: unknown
  action: AuthActions
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
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ state, { payload }:", state, { payload });
        console.log("Pending");
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ state, { payload }:", state, { payload });
        console.log("Fulfilled");
      })
      .addCase(login.rejected, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ state, { payload }:", state, { payload });
        console.log("Rejected");
      });
    builder
      .addCase(register.pending, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ state, { payload }:", state, { payload });
        console.log("Pending");
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ state, { payload }:", state, { payload });
        console.log("Fulfilled");
      })
      .addCase(register.rejected, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ state, { payload }:", state, { payload });
        console.log("Rejected");
      });
    builder
      .addCase(logout.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ state, { payload }:", state, { payload });
        console.log("Fulfilled");
      })
      .addCase(logout.rejected, (state) => {
        console.log("🚀 ~ .addCase ~ state, { payload }:", state);
        console.log("Rejected");

      });
  },
});

export { authSlice };
