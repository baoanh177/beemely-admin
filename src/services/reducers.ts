import { combineReducers } from "@reduxjs/toolkit";

import { accountSlice } from "./store/account/account.slice";
import { appSlice } from "./store/app/app.slice";
import { authSlice } from "./store/auth/auth.slice";

export const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  account: accountSlice.reducer,
});

export type RootStateType = ReturnType<typeof reducers>;
