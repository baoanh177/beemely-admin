import { Navigate, Outlet } from "react-router-dom";

const GuestMiddleware = () => {
  const isLogin = true;
  return !isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default GuestMiddleware;
