import { createSlice } from "@reduxjs/toolkit";

const theme = JSON.parse(localStorage.getItem("theme")!)

const initialState = {
  theme: theme ? theme : "light",
  loading: false
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload
      localStorage.setItem("theme", JSON.stringify(payload))
    }
  }
})
export const { setTheme } = appSlice.actions
export { appSlice }