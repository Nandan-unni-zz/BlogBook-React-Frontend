import { actionCreators } from "./creators";

export const setTab = (tab) => (dispatch) => {
  dispatch(actionCreators.setTab(tab));
};
