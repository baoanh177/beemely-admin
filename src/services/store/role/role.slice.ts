import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRole, deleteRole, getAllRoles, getRoleById, updateRole } from "./role.thunk";
import { IRole } from "./role.model";

export interface IRoleInitialState extends IInitialState {
  roles: IRole[];
  activeRole: IRole | undefined;
}

const initialState: IRoleInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  roles: [],
  activeRole: undefined,
  totalRecords: 0,
  filter: {
    _limit: 10,
    _page: 1,
  },
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    ...commonStaticReducers<IRoleInitialState>(),
    clearActiveRole(state) {
      state.activeRole = undefined
    }
    
  },
  extraReducers(builder) {
    // ? Get all roles
    builder.addCase(getAllRoles.fulfilled, (state, { payload }: PayloadAction<IResponse<IRole[]>>) => {
      state.roles = payload.metaData;
    });
    // ? Get role by id
    builder.addCase(getRoleById.fulfilled, (state, { payload }: PayloadAction<IResponse<IRole>>) => {
      state.activeRole = payload.metaData;
    });
    // ? Create role
    builder
      .addCase(createRole.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createRole.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới thành công";
      })
      .addCase(createRole.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Update role
    builder
      .addCase(updateRole.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateRole.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.activeRole = payload.metaData;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateRole.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Delete role
    builder
      .addCase(deleteRole.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteRole.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.roles = state.roles.filter((role) => role.id !== payload);
      })
      .addCase(deleteRole.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter, clearActiveRole } = roleSlice.actions;
export { roleSlice };
