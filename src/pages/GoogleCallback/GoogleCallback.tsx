import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../Loading/Loading";

const GoogleCallback = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(Object.fromEntries(searchParams)).toString();

  useEffect(() => {
    (async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google/callback?${params}`);
      if(!response.ok) {
        toast.error("Xác thực thất bại")
        return navigate("/auth/login")
      }
      const { metaData } = await response.json();
      const { accessToken, refreshToken } = metaData
      localStorage.setItem("accessToken", JSON.stringify(accessToken))
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
      window.location.pathname = "/dashboard"
    })();
  }, []);

  return <Loading />
};

export default GoogleCallback;
