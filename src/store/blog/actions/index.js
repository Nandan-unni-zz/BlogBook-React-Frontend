import { message } from "antd";
import { actionCreators } from "./creators";
import { getBlogsService } from "../../../services/api/blog.api";
import { logger } from "../../../utils";

const actions = {
  fetchFeed: () => (dispatch) => {
    getBlogsService()
      .then((res) => {
        if (res?.status === 200) {
          dispatch(actionCreators.setBlogs(res?.data));
        } else {
          message.error("Error in fetching feeds !");
        }
      })
      .catch((err) => {
        logger.err(err, "Error in fetching feeds !");
      });
  },
};

export default actions;
