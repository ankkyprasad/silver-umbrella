import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, data: {}, loading: true };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.data = action.payload.userData;
      state.loading = false;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.loading = false;
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
