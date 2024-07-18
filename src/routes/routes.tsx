import DefaultLayout from "@/layouts/Default";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import GlobalMiddleware from "@/middlewares/GlobalMiddleware";
import GuestMiddleware from "@/middlewares/GuestMiddleware";
import NoPathMiddleware from "@/middlewares/NoPathMiddleware";
import PermissionMiddleware from "@/middlewares/PermissionMiddleware";
import Brands from "@/pages/Brand/Brands/Brands";
import CreateBrand from "@/pages/Brand/CreateBrand/CreateBrand";
import UpdateBrand from "@/pages/Brand/UpdateBrand/UpdateBrand";
import Components from "@/pages/Components/Components";
import Dashboard from "@/pages/Dashboard/Dashboard";
import CreateRender from "@/pages/Gender/CreateRender.tsx/CreateRender";
import Gender from "@/pages/Gender/Gender.tsx/Gender";
import UpdateRender from "@/pages/Gender/UpdateRender/UpdateRender";
import Login from "@/pages/Login/Login";
import Orders from "@/pages/Order/Orders/Orders";
import Permissions from "@/pages/Permission/Permissions/Permissions";
import Products from "@/pages/Product/Products/Products";
import CreateRole from "@/pages/Role/CreateRole/CreateRole";
import DetailRole from "@/pages/Role/DetailRole/DetailRole";
import Roles from "@/pages/Role/Roles/Roles";
import UpdateRole from "@/pages/Role/UpdateRole/UpdateRole";
import CreateTag from "@/pages/Tag/CreateTag/CreateTag";
import Tags from "@/pages/Tag/Tags/Tags";
import UpdateTag from "@/pages/Tag/UpdateTag/UpdateTag";
import { EPermissions } from "@/shared/enums/permissions";
import { ReactNode } from "react";

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
            path: "genders",
            pages: [
              {
                path: "/",
                element: () => <Gender />,
              },
              {
                path: "/create",
                element: () => <CreateRender />,
              },
              {
                path: "/update/:id",
                element: () => <UpdateRender />,
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
            path: "brands",
            pages: [
              {
                path: "/",
                element: () => <Brands />,
              },
              {
                path: "/create",
                element: () => <CreateBrand />,
              },
              {
                path: "/update/:id",
                element: () => <UpdateBrand />,
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
