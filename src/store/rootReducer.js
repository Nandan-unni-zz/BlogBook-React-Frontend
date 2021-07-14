import authReducer from "./auth/reducer";
import blogReducer from "./blog/reducer";
import writerReducer from "./writer/reducer";

const rootReducer = {
  auth: authReducer,
  blog: blogReducer,
  writer: writerReducer,
};

export default rootReducer;
