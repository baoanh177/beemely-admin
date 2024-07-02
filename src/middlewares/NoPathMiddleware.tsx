import { Navigate } from "react-router-dom"

const NoPathMiddleware = () => {
  return <Navigate to="/dashboard" />
}

export default NoPathMiddleware