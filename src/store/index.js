import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

import rootReducer from "./rootReducer";
// import { getTokens, setTokens } from "./utils";

export const store = configureStore(
  { reducer: rootReducer, middleware: [reduxThunk] },
  { ...window.__PRELOADED_STATE__ }
);
