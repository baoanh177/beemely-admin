import { FetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState } from "@/shared/utils/shared-interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const commonStaticReducers = <StateType extends IInitialState>() => {
  return {
    resetStatus(state: StateType) {
      state.status = FetchStatus.IDLE;
      state.message = "";
    },
    setFilter: (state: StateType, { payload }: PayloadAction<any>) => {
      state.filter = payload;
    },
  }
}