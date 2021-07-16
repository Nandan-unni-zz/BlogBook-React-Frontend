import { actionTypes } from "./types";

export const actionCreators = {
  setTab: (tab) => {
    return { type: actionTypes.SET_TAB, payload: { tab } };
  },
};
