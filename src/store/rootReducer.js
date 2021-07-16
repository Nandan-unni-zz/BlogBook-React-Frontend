import authReducer from "./auth/reducer";
import blogReducer from "./blog/reducer";
import commonReducer from "./common/reducer";
import feedReducer from "./feed/reducer";
import profileReducer from "./profile/reducer";

const rootReducer = {
  auth: authReducer,
  blog: blogReducer,
  common: commonReducer,
  feed: feedReducer,
  profile: profileReducer,
};

export default rootReducer;
