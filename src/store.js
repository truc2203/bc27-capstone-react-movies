import { configureStore } from "@reduxjs/toolkit";
import authSlice from "modules/Authentication/slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
