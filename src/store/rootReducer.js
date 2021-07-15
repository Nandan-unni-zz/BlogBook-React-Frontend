import authReducer from "./auth/reducer";
import blogReducer from "./blog/reducer";
import feedReducer from "./feed/reducer";
import profileReducer from "./profile/reducer";

const rootReducer = {
  auth: authReducer,
  blog: blogReducer,
  feed: feedReducer,
  profile: profileReducer,
};

export default rootReducer;
