import DefaultLayout from "@/layouts/Default";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import GlobalMiddleware from "@/middlewares/GlobalMiddleware";
import GuestMiddleware from "@/middlewares/GuestMiddleware";
import NoPathMiddleware from "@/middlewares/NoPathMiddleware";
import PermissionMiddleware from "@/middlewares/PermissionMiddleware";
import Components from "@/pages/Components/Components";
import Dashboard from "@/pages/Dashboard/Dashboard";
import GoogleCallback from "@/pages/GoogleCallback/GoogleCallback";
import Login from "@/pages/Login/Login";
import Orders from "@/pages/Order/Orders/Orders";
import Products from "@/pages/Product/Products/Products";
import { EPermissions } from "@/shared/enums/permissions";
import { ReactNode } from "react";
import { brandRoutes } from "./brand.route";
import { colorRoutes } from "./color.router";
import { labelRoutes } from "./label.router";
import { paymentStatusRoutes } from "./paymentStatus.route";
import { paymentTypeRoutes } from "./paymentType.route";
import { permissionRoutes } from "./permission.route";
import { roleRoutes } from "./role.route";
import { sizeRoutes } from "./size.route";
import { tagRoutes } from "./tag.route";
import { userGenderRouter } from "./userGender.route";
import { voucherRoutes } from "./voucher.route";
import { voucherTypeRoutes } from "./voucherType.route";
import { orderStatusRoutes } from "./orderStatus";
import { accountRoutes } from "./account.route";
import { flagPageRoutes } from "./flagPage.route";
import { categoryRoutes } from "./category.route";
import { bannerRoutes } from "./banner.route";
import { shippingMethodRoutes } from "./shippingMethod.route";

export interface IRoute {
  path: string;
  layout?: () => ReactNode;
  middleware?: () => ReactNode;
  element?: () => ReactNode;
  pages?: IRoute[];
}

export const routes: IRoute[] = [
  {
    path: "/",
    middleware: () => <GlobalMiddleware />,
    pages: [
      {
        path: "/",
        middleware: () => <AuthMiddleware />,
        layout: () => <DefaultLayout />,
        pages: [
          {
            path: "/",
            middleware: () => <NoPathMiddleware />,
          },
          {
            path: "dashboard",
            element: () => <Dashboard />,
          },
          {
            path: "products",
            element: () => <Products />,
          },
          {
            path: "orders",
            element: () => <Orders />,
          },
          {
            path: "components",
            element: () => <Components />,
          },
          {
            path: "roles",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_ROLE]} />,
            pages: roleRoutes,
          },
          {
            path: "categories",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_CATEGORY]} />,
            pages: categoryRoutes,
          },
          {
            path: "tags",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_PERMISSION]} />,
            pages: tagRoutes,
          },
          {
            path: "brands",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_PERMISSION]} />,
            pages: brandRoutes,
          },
          {
            path: "labels",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_LABEL]} />,
            pages: labelRoutes,
          },
          {
            path: "permissions",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_PERMISSION]} />,
            pages: permissionRoutes,
          },
          {
            path: "colors",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_COLOR]} />,
            pages: colorRoutes,
          },
          {
            path: "vouchers",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_VOUCHER]} />,
            pages: voucherRoutes,
          },
          {
            path: "voucherTypes",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_VOUCHER_TYPE]} />,
            pages: voucherTypeRoutes,
          },
          {
            path: "user-genders",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_USER_GENDER]} />,
            pages: userGenderRouter,
          },
          {
            path: "sizes",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_SIZE]} />,
            pages: sizeRoutes,
          },
          {
            path: "payment-types",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_PAYMENT_TYPE]} />,
            pages: paymentTypeRoutes,
          },
          {
            path: "payment-statuses",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_PAYMENT_STATUS]} />,
            pages: paymentStatusRoutes,
          },
          {
            path: "order-statuses",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_ORDER_STATUS]} />,
            pages: orderStatusRoutes,
          },
          {
            path: "accounts",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_ACCOUNT]} />,
            pages: accountRoutes,
          },
          {
            path: "flag-pages",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_FLAG_PAGE]} />,
            pages: flagPageRoutes,
          },
          {
            path: "banners",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_BANNER]} />,
            pages: bannerRoutes,
          },
          {
            path: "shipping-methods",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_SHIPPING_METHOD]} />,
            pages: shippingMethodRoutes,
          },
        ],
      },
      {
        path: "auth",
        middleware: () => <GuestMiddleware />,
        pages: [
          {
            path: "login",
            element: () => <Login />,
          },
          {
            path: "google/callback",
            element: () => <GoogleCallback />,
          },
        ],
      },
    ],
  },
];
