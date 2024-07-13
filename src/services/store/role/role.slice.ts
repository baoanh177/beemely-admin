import { commonStaticReducers } from "@/services/shared";
import { FetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRole, deleteRole, getAllRoles, getRoleById, updateRole } from "./role.thunk";
import { IRole } from "./role.model";

export interface IRoleInitialState extends IInitialState {
  roles: IRole[];
  activeRole: IRole | undefined;
}

const initialState: IRoleInitialState = {
  status: FetchStatus.IDLE,
  message: "",
  roles: [],
  activeRole: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
  },
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    ...commonStaticReducers<IRoleInitialState>(),
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
        state.status = FetchStatus.PENDING;
      })
      .addCase(createRole.fulfilled, (state) => {
        state.status = FetchStatus.FULFILLED;
        state.message = "Created successfully";
      })
      .addCase(createRole.rejected, (state) => {
        state.status = FetchStatus.REJECTED;
      });
    // ? Update role
    builder
      .addCase(updateRole.pending, (state) => {
        state.status = FetchStatus.PENDING;
      })
      .addCase(updateRole.fulfilled, (state) => {
        state.status = FetchStatus.FULFILLED;
        state.message = "Updated successfully";
      })
      .addCase(updateRole.rejected, (state) => {
        state.status = FetchStatus.REJECTED;
      });
    // ? Delete role
    builder
      .addCase(deleteRole.pending, (state) => {
        state.status = FetchStatus.PENDING;
      })
      .addCase(deleteRole.fulfilled, (state, { payload }) => {
        state.status = FetchStatus.FULFILLED;
        state.message = "Deleted successfully";
        state.roles = state.roles.filter((role) => role.id !== payload);
      })
      .addCase(deleteRole.rejected, (state) => {
        state.status = FetchStatus.REJECTED;
      });
  },
});

export const { resetStatus, setFilter } = roleSlice.actions;
export { roleSlice };
