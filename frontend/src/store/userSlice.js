import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state) {
      state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
    },
  },
});

export const userSliceActions = userSlice.actions;

export const revokeTokenThunk = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(userSliceActions.logoutUser());
  };
};

export default userSlice;
