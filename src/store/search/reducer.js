import { actionTypes } from "./actions/types";
import { initialState } from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_RESULTS:
      return { ...state, results: action.payload.results };

    case actionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload.searchQuery };

    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload.loading };

    case actionTypes.SET_MSG:
      return { ...state, msg: action.payload.msg };

    default:
      return state;
  }
};

export default reducer;
