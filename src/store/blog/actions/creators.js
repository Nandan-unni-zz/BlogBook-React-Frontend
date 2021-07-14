import { actionTypes } from "./types";

export const actionCreators = {
  setBlogs: (blogs) => {
    return { type: actionTypes.SET_BLOGS, payload: { blogs } };
  },
};
