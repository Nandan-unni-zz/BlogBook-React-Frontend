import { actionTypes } from "./types";

export const actionCreators = {
  resetStore: () => {
    return { type: actionTypes.RESET_STORE };
  },

  setBlog: (blog) => {
    return { type: actionTypes.SET_BLOG, payload: { blog } };
  },

  setLoading: (loading) => {
    return { type: actionTypes.SET_LOADING, payload: { loading } };
  },

  setAuthor: (author) => {
    return { type: actionTypes.SET_AUTHOR, payload: { author } };
  },

  setTitle: (title) => {
    return { type: actionTypes.SET_TITLE, payload: { title } };
  },

  setContent: (content) => {
    return { type: actionTypes.SET_CONTENT, payload: { content } };
  },

  setSubmitType: (submitType) => {
    return { type: actionTypes.SET_SUBMIT_TYPE, payload: { submitType } };
  },
};
