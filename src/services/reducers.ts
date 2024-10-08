import { combineReducers } from "@reduxjs/toolkit";
import { accountSlice } from "./store/account/account.slice";
import { appSlice } from "./store/app/app.slice";
import { authSlice } from "./store/auth/auth.slice";
import { brandSlice } from "./store/brand/brand.slice";
import { categorySlice } from "./store/category/category.slice";
import { colorSlice } from "./store/color/color.slice";
import { labelSlice } from "./store/label/label.slice";
import { permissionSlice } from "./store/permission/permission.slice";
import { roleSlice } from "./store/role/role.slice";
import { tagSlice } from "./store/tag/tag.slice";
import { userGenderSlice } from "./store/userGender/userGender.slice";
import { voucherSlice } from "./store/voucher/voucher.slice";
import { voucherTypeSlice } from "./store/voucherType/voucherType.slice";
import { sizeSlice } from "./store/size/size.slice";
import { paymentTypeSlice } from "./store/paymentType/paymentType.slice";
import { paymentStatuslice } from "./store/paymentStatus/paymentStatus.slice";
import { orderStatusSlice } from "./store/orderStatus/orderStatus.slice";
import { productSlice } from "./store/product/product.slice";
import { productTypeSlice } from "./store/productType/productType.slice";
import { flagPageSlice } from "./store/flagPage/flagPage.slice";
import { bannerSlice } from "./store/banner/banner.slice";
import { shippingMethodSlice } from "./store/shippingMethod/shippingMethod.slice";

export const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  account: accountSlice.reducer,
  role: roleSlice.reducer,
  permission: permissionSlice.reducer,
  tag: tagSlice.reducer,
  category: categorySlice.reducer,
  brand: brandSlice.reducer,
  label: labelSlice.reducer,
  color: colorSlice.reducer,
  voucherType: voucherTypeSlice.reducer,
  userGender: userGenderSlice.reducer,
  voucher: voucherSlice.reducer,
  size: sizeSlice.reducer,
  paymentType: paymentTypeSlice.reducer,
  paymentStatus: paymentStatuslice.reducer,
  orderStatus: orderStatusSlice.reducer,
  product: productSlice.reducer,
  productType: productTypeSlice.reducer,
  flagPage: flagPageSlice.reducer,
  banner: bannerSlice.reducer,
  shippingMethod: shippingMethodSlice.reducer,
});

export type RootStateType = ReturnType<typeof reducers>;
