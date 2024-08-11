import { combineReducers } from "@reduxjs/toolkit";
import { accountSlice } from "./store/account/account.slice";
import { appSlice } from "./store/app/app.slice";
import { authSlice } from "./store/auth/auth.slice";
import { roleSlice } from "./store/role/role.slice";
import { permissionSlice } from "./store/permission/permission.slice";
import { tagSlice } from "./store/tag/tag.slice";
import { genderSlice } from "./store/gender/gender.slice";
import { brandSlice } from "./store/brand/brand.slice";
import { labelSlice } from "./store/label/label.slice";
import { colorSlice } from "./store/color/color.slice";

export const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  account: accountSlice.reducer,
  role: roleSlice.reducer,
  permission: permissionSlice.reducer,
  tag: tagSlice.reducer,
  gender: genderSlice.reducer,
  brand: brandSlice.reducer,
  label: labelSlice.reducer,
  color: colorSlice.reducer,
});

export type RootStateType = ReturnType<typeof reducers>;
