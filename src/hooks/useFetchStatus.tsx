import { RootStateType } from "@/services/reducers";
import { IInitialState } from "@/shared/utils/shared-interfaces";
import { useArchive } from "./useArchive";
import { useEffect } from "react";
import { FetchStatus } from "@/shared/enums/fetchStatus";
import { useNavigate } from "react-router-dom";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type ActionType =
    | Function
  | {
      navigate?: string;
      message?: string;
    }

interface IUseFetchStatusProps {
  module: keyof RootStateType;
  reset: ActionCreatorWithoutPayload;
  actions?: {
    success?: ActionType;
    error?: ActionType;
  };
}

const useFetchStatus = <S extends IInitialState>({ module, reset, actions }: IUseFetchStatusProps) => {
  const { state, dispatch } = useArchive<S>(module);
  const navigate = useNavigate();

  const handleStatus = (type: "success" | "error") => {
    if(actions?.[type]) {
      if(typeof actions?.[type] === "function") {
        actions[type]()
      }else {
        actions[type].message && toast[type](actions[type].message)
        actions[type].navigate && navigate(actions[type].navigate)
      }
    }
  }

  useEffect(() => {
    if (state?.status !== FetchStatus.IDLE) {
      if (state?.status === FetchStatus.FULFILLED) {
        handleStatus("success")
      } else if (state?.status === FetchStatus.REJECTED) {
        handleStatus("error")
      }
      dispatch(reset());
    }
  }, [state?.status]);
};

export default useFetchStatus;
