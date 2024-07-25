import { RootStateType } from "@/services/reducers";
import { IInitialState } from "@/shared/utils/shared-interfaces";
import { useArchive } from "./useArchive";
import { useEffect } from "react";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
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
    pending?: ActionType;
  };
}

const useFetchStatus = <S extends IInitialState>({ module, reset, actions }: IUseFetchStatusProps) => {
  const { state, dispatch } = useArchive<S>(module);
  const navigate = useNavigate();

  const showMessage = (messages: string | { [key: string]: string } | undefined, type: "success" | "error" | "pending") => {
    if (!messages) return;
    if (typeof messages === "object") {
      Object.keys(messages).forEach((key) => {
        // @ts-ignore
        toast[type](messages[key]);
      });
      return;
    }
    // @ts-ignore
    toast[type](messages);
  };

  const handleStatus = (type: "success" | "error" | "pending") => {
    if (type === "success" && actions?.success) {
      if (typeof actions.success === "function") {
        actions.success();
      } else {
        showMessage(actions.success?.message, type);
        actions.success?.navigate && navigate(actions.success?.navigate);
      }
    } else if (type === "error" && actions?.error) {
      if (typeof actions.error === "function") {
        actions.error();
      } else {
        showMessage(actions.error?.message, type);
        actions.error?.navigate && navigate(actions.error?.navigate);
      }
    } else if (type === "pending" && actions?.pending) {
      if (typeof actions.pending === "function") {
        actions.pending();
      } else {
        showMessage(actions.pending?.message, type);
        actions.pending?.navigate && navigate(actions.pending?.navigate);
      }
    }
  };

  useEffect(() => {
    if (state.status !== EFetchStatus.IDLE) {
      if (state.status === EFetchStatus.FULFILLED) {
        handleStatus("success");
        dispatch(reset());
      } else if (state.status === EFetchStatus.REJECTED) {
        handleStatus("error");
        dispatch(reset());
      } else if (state.status === EFetchStatus.PENDING) {
        handleStatus("pending");
      }
    }
  }, [state.status]);
};

export default useFetchStatus;
