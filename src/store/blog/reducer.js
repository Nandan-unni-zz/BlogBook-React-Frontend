import { actionTypes } from "./actions/types";
import { initialState } from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_STORE:
      return { ...initialState };

    case actionTypes.SET_BLOG:
      return { ...state, blog: action.payload.blog };

    case actionTypes.SET_TITLE:
      return { ...state, title: action.payload.title, titleChanged: true };

    case actionTypes.SET_AUTHOR:
      return { ...state, author: action.payload.author };

    case actionTypes.SET_CONTENT:
      return { ...state, content: action.payload.content };

    case actionTypes.SET_SUBMIT_TYPE:
      return { ...state, submitType: action.payload.submitType };

    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
};

export default reducer;
