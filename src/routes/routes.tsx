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
import Roles from "@/pages/Role/Roles/Roles";
import CreateRole from "@/pages/Role/CreateRole/CreateRole";
import UpdateRole from "@/pages/Role/UpdateRole/UpdateRole";
import DetailRole from "@/pages/Role/DetailRole/DetailRole";
import Permissions from "@/pages/Permission/Permissions/Permissions";
import PermissionMiddleware from "@/middlewares/PermissionMiddleware";
import { EPermissions } from "@/shared/enums/permissions";
import Tags from "@/pages/Tag/Tags/Tags";
import CreateTag from "@/pages/Tag/CreateTag/CreateTag";
import UpdateTag from "@/pages/Tag/UpdateTag/UpdateTag";

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
            pages: [
              {
                path: "/",
                element: () => <Roles />,
              },
              {
                path: "/create",
                element: () => <CreateRole />,
              },
              {
                path: "/update/:id",
                element: () => <UpdateRole />,
              },
              {
                path: "/detail/:id",
                element: () => <DetailRole />,
              },
            ],
          },
          {
            path: "tags",
            pages: [
              {
                path: "/",
                element: () => <Tags />,
              },
              {
                path: "/create",
                element: () => <CreateTag />,
              },
              {
                path: "/update/:id",
                element: () => <UpdateTag />,
              },
            ],
          },
          {
            path: "permissions",
            middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_PERMISSION]} />,
            pages: [
              {
                path: "/",
                element: () => <Permissions />,
                middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_PERMISSION]} />,
              },
            ],
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
        ],
      },
    ],
  },
];
