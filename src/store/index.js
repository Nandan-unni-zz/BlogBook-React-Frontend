import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

import { reducer } from "./reducer";
// import { getTokens, setTokens } from "./utils";

export const store = configureStore(
  { reducer, middleware: [reduxThunk] },
  { ...window.__PRELOADED_STATE__ }
);
