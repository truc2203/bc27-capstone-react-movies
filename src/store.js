import { configureStore } from "@reduxjs/toolkit";
import authSlice from "modules/Authentication/slices/authSlice";
import movieReducer from './reducer/movieReducer'
const store = configureStore({
  reducer: {
    auth: authSlice,
    movie:movieReducer
  },
});

export default store;
