import { ReactNode } from "react";
import DefaultLayout from "@/layouts/Default";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Components from "@/pages/Components/Components";
import NoPathMiddleware from "@/middlewares/NoPathMiddleware";
import Products from "@/pages/Product/Products/Products";
import Login from "@/pages/Login/Login";
import GuestMiddleware from "@/middlewares/GuestMiddleware";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import GlobalMiddleware from "@/middlewares/GlobalMiddleware";
import Orders from "@/pages/Order/Orders/Orders";
import PermissionMiddleware from "@/middlewares/PermissionMiddleware";
import { EPermissions } from "@/shared/enums/permissions";
import { roleRoutes } from "./role.route";
import { genderRoutes } from "./gender.route";
import { tagRoutes } from "./tag.route";
import { permissionRoutes } from "./permission.route";
import { brandRoutes } from "./brand.route";
import { labelRoutes } from "./label.router";
import GoogleCallback from "@/pages/GoogleCallback/GoogleCallback";
import { colorRoutes } from "./color.router";
import { voucherTypeRoutes } from "./voucherType.route";
import { userGenderRouter } from "./userGender.route";
import { voucherRoutes } from "./voucher.route";
import { sizeRoutes } from "./size.route";

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
            path: "genders",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_GENDER]} />,
            pages: genderRoutes,
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
