import { actionCreators } from "./creators";
import { store } from "../../index";
import {
  getWritersService,
  searchWriterService,
} from "../../../services/api/writer.api";
import { actionCreators as commonActions } from "../../common/actions/creators";

export const postFollowResultUpdate = (data) => (dispatch) => {
  const state = store.getState().search,
    index = state.results.findIndex((item) => item.pk === data.pk);
  state.results[index] = { ...state.results[index], ...data };
  dispatch(actionCreators.setResults(state.results));
  dispatch(commonActions.setFollowingPk(-1));
};

export const getInitialData = () => (dispatch) => {
  dispatch(actionCreators.setLoading(true));
  getWritersService().then(({ data }) => {
    dispatch(actionCreators.setResults(data));
    dispatch(actionCreators.setLoading(false));
  });
};

export const searchQuery = (val) => (dispatch) => {
  dispatch(actionCreators.setLoading(true));
  searchWriterService({ username: val }).then((res) => {
    if (res?.status === 200) {
      dispatch(actionCreators.setResults(res?.data));
      dispatch(actionCreators.setMsg(`${res?.data?.length} results found`));
    } else {
      dispatch(actionCreators.setMsg("Error in fetching results"));
    }
    dispatch(actionCreators.setLoading(false));
  });
};
