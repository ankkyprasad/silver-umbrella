import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import flashSlice from "./flashSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    flash: flashSlice.reducer,
  },
});

export default store;
