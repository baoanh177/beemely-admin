import { commonStaticReducers } from "@/services/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPermission, deletePermission, getAllModules, getAllPermissions, getPermissionById, updatePermission } from "./permission.thunk";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IPermission } from "./permission.model";

export interface IPermissionInitialState extends IInitialState {
  permissions: IPermission[];
  modules: string[];
  activePermission: IPermission | undefined;
}

const initialState: IPermissionInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  filter: {
    _page: 1,
    _size: 10,
  },
  totalRecords: 0,
  permissions: [],
  activePermission: undefined,
  modules: [],
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    ...commonStaticReducers<IPermissionInitialState>(),
  },
  extraReducers(builder) {
    // ? Get all permissions
    builder
      .addCase(getAllPermissions.fulfilled, (state, { payload }: PayloadAction<IResponse<IPermission[]>>) => {
        state.permissions = payload.metaData;
        state.totalRecords = payload.totalDocs ?? 0;
      })
      .addCase(getAllPermissions.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Get permission by id
    builder
      .addCase(getPermissionById.fulfilled, (state, { payload }: PayloadAction<IResponse<IPermission>>) => {
        state.activePermission = payload.metaData;
      })
      .addCase(getPermissionById.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Create permission
    builder
      .addCase(createPermission.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createPermission.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
      })
      .addCase(createPermission.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Update permission
    builder
      .addCase(updatePermission.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updatePermission.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Updated successfully";
      })
      .addCase(updatePermission.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Get all modules
    builder
      .addCase(getAllModules.fulfilled, (state, { payload }: PayloadAction<IResponse<string[]>>) => {
        state.modules = payload.metaData;
      })
      .addCase(getAllModules.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Delete permission
    builder
      .addCase(deletePermission.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deletePermission.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Deleted successfully";
        state.permissions = state.permissions.filter((permission) => permission.id !== payload);
      })
      .addCase(deletePermission.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = permissionSlice.actions;
export { permissionSlice };
