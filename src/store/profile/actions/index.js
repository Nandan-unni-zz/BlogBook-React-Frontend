import { message } from "antd";
import { actionCreators } from "./creators";
import { getWriterService } from "../../../services/api/writer.api";
import { blogMapper, logger, userStorage } from "../../../utils";
import mapper from "../mapper";
import { store } from "../../index";
import { actionCreators as commonActions } from "../../common/actions/creators";

const {
  setData,
  setFollowing,
  setFollowers,
  setPublishedBlogs,
  setArchivedBlogs,
  setSavedBlogs,
  setTab,
  setLoading,
} = actionCreators;

const actions = {
  fetchWriter: (userId) => (dispatch) => {
    dispatch(setLoading(true));
    getWriterService(userId)
      .then((res) => {
        if (res?.status === 200) {
          dispatch(
            setData(
              mapper(res?.data),
              res?.data?.pk === userStorage.getUser()?.pk
            )
          );
          dispatch(setFollowing(res?.data?.following));
          dispatch(setFollowers(res?.data?.followers));
          dispatch(setPublishedBlogs(blogMapper(res?.data?.pub_blogs)));
          dispatch(setArchivedBlogs(blogMapper(res?.data?.arch_blogs)));
          dispatch(setSavedBlogs(blogMapper(res?.data?.saved_blogs)));
          dispatch(setLoading(false));
        } else {
          message.error("Some error occured !");
        }
      })
      .catch((err) => {
        logger.err(err, "Some error occured !");
      });
  },

  updateWriter: (data) => (dispatch) => {
    data?.pk === store.getState().profile.data.pk &&
      dispatch(setFollowers(data?.followers));
    data?.pk === store.getState().profile.data.pk &&
      dispatch(setFollowing(data?.following));
    dispatch(commonActions.setFollowingPk(-1));
  },

  postFollowUserUpdate: (data) => (dispatch) => {
    const state = store.getState().profile,
      followersIndex = state.followers.findIndex(
        (follower) => follower.pk === data.pk
      ),
      followingIndex = state.following.findIndex(
        (follower) => follower.pk === data.pk
      );
    state.followers[followersIndex] = {
      ...state.followers[followersIndex],
      ...data,
    };
    dispatch(actionCreators.setFollowers(state.followers));
    state.following[followingIndex] = {
      ...state.following[followingIndex],
      ...data,
    };
    dispatch(actionCreators.setFollowing(state.following));
    dispatch(commonActions.setFollowingPk(-1));
  },

  setTab: (tab) => (dispatch) => {
    dispatch(setTab(tab));
  },
};

export default actions;
