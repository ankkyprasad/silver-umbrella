import { createSlice } from "@reduxjs/toolkit";

const initialState = { display: false, errorMessage: "" };

const flashSlice = createSlice({
  name: "flash-message-slice",
  initialState,
  reducers: {
    turnOnDisplay(state, action) {
      state.display = true;
      state.errorMessage = action.payload.errorMessage;
    },
    turnOffDisplay(state) {
      state.display = false;
    },
  },
});

export const flashSliceActions = flashSlice.actions;

export const displayErrorMessage = (errorMessage) => {
  return (dispatch) => {
    dispatch(flashSliceActions.turnOnDisplay({ errorMessage }));

    setTimeout(() => {
      dispatch(flashSliceActions.turnOffDisplay());
    }, 5000);
  };
};

export default flashSlice;
