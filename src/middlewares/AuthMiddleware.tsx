import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { IGlobalMiddlewareContext } from "./GlobalMiddleware";

const AuthMiddleware = () => {
  const { isLogin } = useOutletContext<IGlobalMiddlewareContext>()
  return isLogin ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default AuthMiddleware;
