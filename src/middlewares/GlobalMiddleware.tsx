import { useArchive } from "@/hooks/useArchive";
import Loading from "@/pages/Loading/Loading";
import { IUserProfile } from "@/services/store/auth/auth.model";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { getProfile } from "@/services/store/auth/auth.thunk";
import { FetchStatus } from "@/shared/enums/fetchStatus";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export interface IGlobalMiddlewareContext {
  profile: IUserProfile | null;
  isLogin: boolean;
}

const GlobalMiddleware = () => {
  const [mounted, setMounted] = useState(false);

  const { state, dispatch } = useArchive<IAuthInitialState>("auth");

  useEffect(() => {
    dispatch(getProfile()).then(() => {
      setMounted(true);
    });
  }, [state.loginTime]);

  useEffect(() => {
    if (state.status !== FetchStatus.IDLE && state.status !== FetchStatus.PENDING) {
      dispatch(resetStatus());
    }
  }, [state.status]);
  if (!mounted) return <Loading />;

  return <Outlet context={{ profile: state.profile, isLogin: state.isLogin } as IGlobalMiddlewareContext} />;
};

export default GlobalMiddleware;
