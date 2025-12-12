import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/Register/registerSlice";
import postReducer from "../features/Post/postSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    post: postReducer, // ✔ CORRECT NAME
  },
});
