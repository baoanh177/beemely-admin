import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, ISearchParams } from "@/shared/utils/shared-interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const commonStaticReducers = <StateType extends IInitialState>() => {
  return {
    resetStatus(state: StateType) {
      state.status = EFetchStatus.IDLE;
      state.message = "";
    },
    setFilter: (state: StateType, { payload }: PayloadAction<ISearchParams>) => {
      state.filter = payload;
    },
  };
};
