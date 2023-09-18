import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, data: {} };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.data = action.payload.userData;
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
