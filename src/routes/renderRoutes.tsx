import { Fragment } from "react/jsx-runtime";
import { IRoute } from "./routes";
import NotFound from "@/pages/Errors/NotFound";
import { Route } from "react-router-dom";

export const renderRoutes = (routes: IRoute[], initPath = "/") => {
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
