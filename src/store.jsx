import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./Features/scoreSlice";
export default configureStore({
  reducer: {
    score: scoreReducer,
  },
});
