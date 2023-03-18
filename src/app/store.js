import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import editorReducer from "../feature/editorSlice";
import userReducer from "../feature/userSlice";

const store = configureStore({
  reducer: {
    editor: editorReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
