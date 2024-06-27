import { combineReducers } from "@reduxjs/toolkit";

import { accountSlice } from "./actions/account.action";
import { appSlice } from "./actions/app.action";
import { authSlice } from "./actions/auth.action";

export const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  account: accountSlice.reducer,
});

export type RootStateType = ReturnType<typeof reducers>;
