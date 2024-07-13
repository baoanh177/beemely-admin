import { commonStaticReducers } from "@/services/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllModules, getAllPermissions } from "./permission.thunk";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { FetchStatus } from "@/shared/enums/fetchStatus";
import { IPermission } from "./permission.model";

export interface IPermissionInitialState extends IInitialState {
  permissions: IPermission[];
  modules: string[];
}

const initialState: IPermissionInitialState = {
  status: FetchStatus.IDLE,
  message: "",
  filter: {
    page: 1,
    size: 10,
  },
  totalRecords: 0,
  permissions: [],
  modules: [],
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    ...commonStaticReducers<IPermissionInitialState>(),
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPermissions.fulfilled, (state, { payload }: PayloadAction<IResponse<IPermission[]>>) => {
        state.permissions = payload.metaData;
      })
      .addCase(getAllPermissions.rejected, (state) => {
        state.status = FetchStatus.REJECTED;
        state.message = "Something went wrong, please try again later";
      });
    builder
      .addCase(getAllModules.fulfilled, (state, { payload }: PayloadAction<IResponse<string[]>>) => {
        state.modules = payload.metaData;
      })
      .addCase(getAllModules.rejected, (state) => {
        state.status = FetchStatus.REJECTED;
        state.message = "Something went wrong, please try again later";
      });
  },
});

export const { resetStatus } = permissionSlice.actions;
export { permissionSlice };
