import DefaultLayout from "@/layouts/Default";
import Dashboard from "@/pages/Dashboard/Dashboard";
import NotFound from "@/pages/Errors/NotFound";
import Accounts from "@/pages/Accounts/Accounts";
import { ReactNode } from "react";
import { Route } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

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
        const {
          layout: Layout,
          middleware: Middleware,
          element: Component,
          path,
        } = route;

        const completePath = (initPath + path).replaceAll("//", "/");
        return (
          <Fragment key={index}>
            <Route path="*" element={<NotFound />} />
            {Layout ? (
              <Route path="/" element={<Layout />}>
                {Middleware ? (
                  <Route path="/" element={<Middleware />}>
                    {Component ? (
                      <Route path={completePath} element={<Component />} />
                    ) : (
                      renderRoutes(route.pages ?? [], completePath)
                    )}
                  </Route>
                ) : Component ? (
                  <Route path={completePath} element={<Component />} />
                ) : (
                  renderRoutes(route.pages ?? [], completePath)
                )}
              </Route>
            ) : Middleware ? (
              <Route path="/" element={<Middleware />}>
                {Component ? (
                  <Route path={completePath} element={<Component />} />
                ) : (
                  renderRoutes(route.pages ?? [], completePath)
                )}
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
    layout: () => <DefaultLayout />,
    pages: [
      {
        path: "dashboard",
        element: () => <Dashboard />,
      },
      {
        path: "products",
        element: () => <Dashboard />,
      },
    ],
  },
];

export { routes, renderRoutes };