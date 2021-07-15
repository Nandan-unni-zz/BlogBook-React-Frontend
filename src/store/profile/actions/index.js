import { message } from "antd";
import { actionCreators } from "./creators";
import { getWriterService } from "../../../services/api/writer.api";
import { blogMapper, logger, userStorage } from "../../../utils";
import mapper from "../mapper";

const userPk = userStorage.getUser()?.pk;
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
          dispatch(setData(mapper(res?.data), res?.data?.pk === userPk));
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

  setTab: (tab) => (dispatch) => {
    dispatch(setTab(tab));
  },
};

export default actions;
