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
import { voucherTypeSlice } from "./store/voucherType/voucherType.slice";
import { userGenderSlice } from "./store/userGender/userGender.slice";
import { voucherSlice } from "./store/voucher/voucher.slice";
import { sizeSlice } from "./store/size/size.slice";
import { paymentStatuslice } from "./store/paymentStatus/paymentStatus.slice";

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
  voucherType: voucherTypeSlice.reducer,
  userGender: userGenderSlice.reducer,
  voucher: voucherSlice.reducer,
  size: sizeSlice.reducer,
  paymentStatus: paymentStatuslice.reducer,
});

export type RootStateType = ReturnType<typeof reducers>;
