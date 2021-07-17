import { actionTypes } from "./types";

export const actionCreators = {
  setResults: (results) => {
    return {
      type: actionTypes.SET_RESULTS,
      payload: { results },
    };
  },

  setSearchQuery: (searchQuery) => {
    return {
      type: actionTypes.SET_SEARCH_QUERY,
      payload: { searchQuery },
    };
  },

  setLoading: (loading) => {
    return {
      type: actionTypes.SET_LOADING,
      payload: { loading },
    };
  },

  setMsg: (msg) => {
    return {
      type: actionTypes.SET_MSG,
      payload: { msg },
    };
  },
};
