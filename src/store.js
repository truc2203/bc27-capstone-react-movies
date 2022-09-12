import { configureStore } from "@reduxjs/toolkit";
import authSlice from "modules/Authentication/slices/authSlice";
import userReducer from "reducer/userReducer";
import movieReducer from './reducer/movieReducer'
const store = configureStore({
  reducer: {
    auth: authSlice,
    movie:movieReducer,
    user:userReducer
  },
});

export default store;
