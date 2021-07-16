import { actionTypes } from "./types";

export const actionCreators = {
  signupBegin: () => {
    return { type: actionTypes.SIGNUP_BEGIN };
  },

  signupSuccess: () => {
    return { type: actionTypes.SIGNUP_SUCESS };
  },

  signupError: () => {
    return { type: actionTypes.SIGNUP_ERROR };
  },

  loginBegin: () => {
    return { type: actionTypes.LOGIN_BEGIN };
  },

  loginSuccess: (userData) => {
    return {
      type: actionTypes.LOGIN_SUCESS,
      payload: { userData },
    };
  },

  loginError: () => {
    return { type: actionTypes.LOGIN_ERROR };
  },

  logout: () => {
    return { type: actionTypes.LOGOUT };
  },

  setUserId: (userId) => {
    return { type: actionTypes.SET_USER_ID, payload: { userId } };
  },
};
