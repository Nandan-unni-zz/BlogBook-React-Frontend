import { message } from "antd";
import { actionCreators } from "./creators";
import { getWriterService } from "../../../services/api/writer.api";
import { logger, userStorage } from "../../../utils";
import mapper from "../mapper";

const userPk = userStorage.getUser()?.pk;

const actions = {
  fetchWriter: (userId) => (dispatch) => {
    getWriterService(userId)
      .then((res) => {
        if (res?.status === 200) {
          dispatch(
            actionCreators.setProfile(
              mapper(res?.data),
              res?.data?.pk === userPk,
              res?.data?.followers?.some((follower) => follower.pk === userPk)
            )
          );
          dispatch(actionCreators.setFollowers(res?.data?.followers));
          dispatch(actionCreators.setFollowing(res?.data?.following));
          dispatch(actionCreators.setPublishedBlogs(res?.data?.pub_blogs));
          dispatch(actionCreators.setArchivedBlogs(res?.data?.arch_blogs));
          dispatch(actionCreators.setSavedBlogs(res?.data?.saved_blogs));
        } else {
          message.error("Some error occured !");
        }
      })
      .catch((err) => {
        logger.err(err, "Some error occured !");
      });
  },

  setTab: (tab) => (dispatch) => {
    dispatch(actionCreators.setTab(tab));
  },
};

export default actions;
