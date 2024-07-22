import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});
export { appSlice };
