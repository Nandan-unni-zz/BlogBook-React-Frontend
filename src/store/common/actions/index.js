import { message } from "antd";

import { actionCreators } from "./creators";
import { followWriterService } from "../../../services/api/writer.api";
import {
  deleteBlogService,
  updateBlogService,
} from "../../../services/api/blog.api";
import { userStorage } from "../../../utils";

const { getUser } = userStorage;

export const followOrUnfollow = (pk, callback) => (dispatch) => {
  dispatch(actionCreators.setFollowingPk(pk));
  followWriterService(getUser().pk, pk).then((res) => {
    if (res?.status === 200) {
      callback && callback(res?.data);
    }
  });
};

export const alterBlog = (pk, isPublished, callback) => (dispatch) => {
  dispatch(actionCreators.setAltBlogPk(pk));
  updateBlogService(pk, { is_published: !isPublished }).then((res) => {
    if (res.status === 200) {
      dispatch(actionCreators.setAltBlogPk(-1));
      message.success(`Blog ${isPublished ? "archived" : "published"}`);
      callback && callback();
    }
  });
};

export const deleteBlog = (pk, callback) => (dispatch) => {
  dispatch(actionCreators.setDltBlogPk(pk));
  deleteBlogService(pk).then((res) => {
    if (res.status === 204) {
      dispatch(actionCreators.setDltBlogPk(-1));
      message.success("Blog Deleted");
      callback && callback();
    }
  });
};
