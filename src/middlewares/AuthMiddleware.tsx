import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = () => {
  const isLogin = !!localStorage.getItem("accessToken");
  return isLogin ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default AuthMiddleware;
