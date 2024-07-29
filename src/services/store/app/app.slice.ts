import { createSlice } from "@reduxjs/toolkit";

export interface IAppInitialState {
  loading: boolean;
  mobileMenu: boolean;
}

const initialState: IAppInitialState = {
  loading: false,
  mobileMenu: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMobileMenu: (state, { payload }) => {
      state.mobileMenu = payload;
    },
  },
});
export const { setMobileMenu } = appSlice.actions;
export { appSlice };
