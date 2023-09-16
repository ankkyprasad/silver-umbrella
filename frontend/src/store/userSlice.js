import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, token: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice;
