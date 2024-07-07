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
    };

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
    if (type == "success" && actions?.success) {
      if (typeof actions.success === "function") {
        actions.success();
      } else {
        actions.success?.message && toast.success(actions.success?.message);
        actions.success?.navigate && navigate(actions.success?.navigate);
      }
    } else if (type == "error" && actions?.error) {
      if (typeof actions.error === "function") {
        actions.error();
      } else {
        actions.error?.message && toast.error(actions.error?.message);
        actions.error?.navigate && navigate(actions.error?.navigate);
      }
    }
  };

  useEffect(() => {
    if (state?.status !== FetchStatus.IDLE) {
      if (state?.status === FetchStatus.FULFILLED) {
        handleStatus("success");
      } else if (state?.status === FetchStatus.REJECTED) {
        handleStatus("error");
      }
      dispatch(reset());
    }
  }, [state?.status]);
};

export default useFetchStatus;
