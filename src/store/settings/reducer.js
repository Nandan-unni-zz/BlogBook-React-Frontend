import { actionTypes } from "./actions/types";
import { initialState } from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TAB:
      return { ...state, tab: action.payload.tab };

    default:
      return state;
  }
};

export default reducer;
