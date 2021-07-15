import { actionTypes } from "./actions/types";
import { initialState } from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TITLE:
      return { ...state, title: action.payload.title };

    case actionTypes.SET_CONTENT:
      return { ...state, content: action.payload.content };

    case actionTypes.SET_SUBMIT_TYPE:
      return { ...state, submitType: action.payload.submitType };

    default:
      return state;
  }
};

export default reducer;
