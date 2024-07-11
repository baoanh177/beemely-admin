import { commonStaticReducers } from "@/services/shared";
import { FetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRole, getAllRoles } from "./role.thunk";
import { IRole } from "./role.model";

export interface IRoleInitialState extends IInitialState {
  roles: IRole[]
}

const initialState: IRoleInitialState = {
  status: FetchStatus.IDLE,
  message: "",
  roles: [],
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
    builder
      .addCase(getAllRoles.fulfilled, (state, { payload }: PayloadAction<IResponse<IRole[ ]>>) => {
        state.roles = payload.metaData
      })
    builder
      .addCase(createRole.pending, (state) => {
        state.status = FetchStatus.PENDING
      })
      .addCase(createRole.fulfilled, (state) => {
        state.status = FetchStatus.FULFILLED
        state.message = "New role created successfully"
      })
      .addCase(createRole.rejected, (state) => {
        state.status = FetchStatus.REJECTED
      })
  },
});

export const { resetStatus } = roleSlice.actions;
export { roleSlice };