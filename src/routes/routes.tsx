import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";
import { Route } from "react-router-dom";

import DefaultLayout from "@/layouts/Default";
import Dashboard from "@/pages/Dashboard/Dashboard";
import NotFound from "@/pages/Errors/NotFound";

import Components from "@/pages/Components/Components";
import NoPathMiddleware from "@/middlewares/NoPathMiddleware";
import Products from "@/pages/Products/Products";
import Login from "@/pages/Login/Login";
import GuestMiddleware from "@/middlewares/GuestMiddleware";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import Accounts from "@/pages/Accounts/Accounts";

interface IRoute {
  path: string;
  layout?: () => ReactNode;
  middleware?: () => ReactNode;
  element?: () => ReactNode;
  pages?: IRoute[];
}

const renderRoutes = (routes: IRoute[], initPath = "/") => {
  return (
    <>
      {routes.map((route: IRoute, index) => {
        const { layout: Layout, middleware: Middleware, element: Component, path } = route;

        const completePath = (initPath + (path.startsWith("/") ? path : `/${path}`)).replaceAll("//", "/");

        return (
          <Fragment key={index}>
            <Route path="*" element={<NotFound />} />
            {Layout ? (
              <Route path="/" element={<Layout />}>
                {Middleware ? (
                  <Route path="/" element={<Middleware />}>
                    {Component ? <Route path={completePath} element={<Component />} /> : renderRoutes(route.pages ?? [], completePath)}
                  </Route>
                ) : Component ? (
                  <Route path={completePath} element={<Component />} />
                ) : (
                  renderRoutes(route.pages ?? [], completePath)
                )}
              </Route>
            ) : Middleware ? (
              <Route path="/" element={<Middleware />}>
                {Component ? <Route path={completePath} element={<Component />} /> : renderRoutes(route.pages ?? [], completePath)}
              </Route>
            ) : Component ? (
              <Route path={completePath} element={<Component />} />
            ) : (
              renderRoutes(route.pages ?? [], completePath)
            )}
          </Fragment>
        );
      })}
    </>
  );
};

const routes: IRoute[] = [
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
        path: "components",
        element: () => <Components />,
      },
      {
        path: "accounts",
        element: () => <Accounts />,
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
];

export { routes, renderRoutes };
