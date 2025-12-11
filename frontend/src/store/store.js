import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/Register/registerSlice";
import { postSlice } from "../features/Post/postSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer, // ← VERY IMPORTANT!
    album: postSlice.reducer,
  },
});
