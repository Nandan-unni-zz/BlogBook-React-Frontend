import { actionTypes } from "./actions/types";
import { initialState } from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FOLLOWING_PK:
      return { ...state, followingPk: action.payload.pk };

    case actionTypes.SET_ALT_BLOG_PK:
      return { ...state, altBlogPk: action.payload.pk };

    case actionTypes.SET_DLT_BLOG_PK:
      return { ...state, dltBlogPk: action.payload.pk };

    default:
      return state;
  }
};

export default reducer;
