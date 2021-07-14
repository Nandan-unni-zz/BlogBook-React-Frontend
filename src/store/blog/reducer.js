import { actionTypes } from "./actions/types";
import { initialState } from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BLOGS:
      return { ...state, blogs: action.payload.blogs, loadingFeed: false };

    default:
      return state;
  }
};

export default reducer;
