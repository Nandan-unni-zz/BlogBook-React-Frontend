import { actionTypes } from "./actions/types";
import { initialState } from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload.data,
        isUser: action.payload.isUser,
      };

    case actionTypes.SET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload.followers,
      };

    case actionTypes.SET_FOLLOWING:
      return {
        ...state,
        following: action.payload.following,
      };

    case actionTypes.SET_PUBLISHED_BLOGS:
      return {
        ...state,
        publishedBlogs: action.payload.publishedBlogs,
      };

    case actionTypes.SET_ARCHIVED_BLOGS:
      return {
        ...state,
        archivedBlogs: action.payload.archivedBlogs,
      };

    case actionTypes.SET_SAVED_BLOGS:
      return {
        ...state,
        savedBlogs: action.payload.savedBlogs,
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case actionTypes.SET_TAB:
      return {
        ...state,
        selectedTab: action.payload.tab,
      };

    default:
      return state;
  }
};

export default reducer;
