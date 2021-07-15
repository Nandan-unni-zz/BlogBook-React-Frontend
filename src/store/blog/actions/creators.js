import { actionTypes } from "./types";

export const actionCreators = {
  setLoading: (loading) => {
    return { type: actionTypes.SET_LOADING, payload: { loading } };
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
