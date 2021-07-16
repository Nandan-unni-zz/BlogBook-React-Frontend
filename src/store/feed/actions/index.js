import { message } from "antd";
import { actionCreators } from "./creators";
import {
  getBlogsService,
  likeBlogService,
  saveBlogService,
} from "../../../services/api/blog.api";
import { blogMapper, logger, userStorage } from "../../../utils";
import { store } from "../../index";

const actions = {
  fetchFeed: () => (dispatch) => {
    getBlogsService()
      .then((res) => {
        if (res?.status === 200) {
          dispatch(actionCreators.setBlogs(blogMapper(res?.data)));
        } else {
          message.error("Error in fetching feeds !");
        }
      })
      .catch((err) => {
        logger.err(err, "Error in fetching feeds !");
      });
  },

  likeBlog: (pk) => (dispatch) => {
    likeBlogService(pk, userStorage.getUser().pk)
      .then((res) => {
        if (res.status === 200) {
          store.getState().feed.blogs[
            store.getState().feed.blogs.findIndex((blog) => blog.pk === pk)
          ] = res?.data;
          dispatch(
            actionCreators.setBlogs(blogMapper(store.getState().feed.blogs))
          );
        } else {
          message.error("Some error occured !");
        }
      })
      .catch((err) => logger.err(err, "Some error occured !"));
  },

  saveBlog: (pk) => (dispatch) => {
    saveBlogService(pk, userStorage.getUser().pk)
      .then((res) => {
        if (res.status === 200) {
          store.getState().feed.blogs[
            store.getState().feed.blogs.findIndex((blog) => blog.pk === pk)
          ] = res?.data;
          dispatch(
            actionCreators.setBlogs(blogMapper(store.getState().feed.blogs))
          );
        } else {
          message.error("Some error occured !");
        }
      })
      .catch((err) => logger.err(err, "Some error occured !"));
  },

  removeBlogFromFeed: (pk) => (dispatch) => {
    dispatch(
      actionCreators.setBlogs(
        store.getState().feed.blogs.filter((blog) => blog?.pk !== pk)
      )
    );
  },
};

export default actions;
