import { actionTypes } from "./types";

export const actionCreators = {
  setLoading: (loading) => {
    return { type: actionTypes.SET_LOADING, payload: { loading } };
  },

  setTab: (tab) => {
    return { type: actionTypes.SET_TAB, payload: { tab } };
  },

  setData: (data, isUser) => {
    return {
      type: actionTypes.SET_DATA,
      payload: { data, isUser },
    };
  },

  setFollowers: (followers) => {
    return { type: actionTypes.SET_FOLLOWERS, payload: { followers } };
  },

  setFollowing: (following) => {
    return { type: actionTypes.SET_FOLLOWING, payload: { following } };
  },

  setPublishedBlogs: (publishedBlogs) => {
    return {
      type: actionTypes.SET_PUBLISHED_BLOGS,
      payload: { publishedBlogs },
    };
  },

  setArchivedBlogs: (archivedBlogs) => {
    return { type: actionTypes.SET_ARCHIVED_BLOGS, payload: { archivedBlogs } };
  },

  setSavedBlogs: (savedBlogs) => {
    return { type: actionTypes.SET_SAVED_BLOGS, payload: { savedBlogs } };
  },
};
