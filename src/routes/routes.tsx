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
import GlobalMiddleware from "@/middlewares/GlobalMiddleware";

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
            {Middleware ? (
              <Route path="/" element={<Middleware />}>
                {Layout ? (
                  <Route path="/" element={<Layout />}>
                    {Component ? <Route path={completePath} element={<Component />} /> : renderRoutes(route.pages ?? [], completePath)}
                  </Route>
                ) : Component ? (
                  <Route path={completePath} element={<Component />} />
                ) : (
                  renderRoutes(route.pages ?? [], completePath)
                )}
              </Route>
            ) : Layout ? (
              <Route path="/" element={<Layout />}>
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
            path: "components",
            element: () => <Components />,
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

export { routes, renderRoutes };
