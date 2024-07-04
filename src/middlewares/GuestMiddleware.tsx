import { Navigate, Outlet } from "react-router-dom";

const GuestMiddleware = () => {
  const isLogin = !!localStorage.getItem("accessToken");
  return !isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default GuestMiddleware;
