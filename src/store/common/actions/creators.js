import { actionTypes } from "./types";

export const actionCreators = {
  setFollowingPk: (pk) => {
    return { type: actionTypes.SET_FOLLOWING_PK, payload: { pk } };
  },

  setAltBlogPk: (pk) => {
    return { type: actionTypes.SET_ALT_BLOG_PK, payload: { pk } };
  },

  setDltBlogPk: (pk) => {
    return { type: actionTypes.SET_DLT_BLOG_PK, payload: { pk } };
  },
};
