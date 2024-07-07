import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { IGlobalMiddlewareContext } from "./GlobalMiddleware";

const GuestMiddleware = () => {
  const { isLogin } = useOutletContext<IGlobalMiddlewareContext>();
  return !isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default GuestMiddleware;
