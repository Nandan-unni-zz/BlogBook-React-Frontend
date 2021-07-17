import authReducer from "./auth/reducer";
import blogReducer from "./blog/reducer";
import commonReducer from "./common/reducer";
import feedReducer from "./feed/reducer";
import profileReducer from "./profile/reducer";
import settingsReducer from "./settings/reducer";
import searchReducer from "./search/reducer";

const rootReducer = {
  auth: authReducer,
  blog: blogReducer,
  common: commonReducer,
  feed: feedReducer,
  profile: profileReducer,
  settings: settingsReducer,
  search: searchReducer,
};

export default rootReducer;
