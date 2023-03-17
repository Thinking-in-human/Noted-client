import { configureStore } from "@reduxjs/toolkit";

import editorReducer from "../feature/editorSlice";
import userReducer from "../feature/userSlice";

const store = configureStore({
  reducer: {
    editor: editorReducer,
    user: userReducer,
  },
});

export default store;
