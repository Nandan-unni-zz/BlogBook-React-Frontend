import { message } from "antd";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import htmlToDraftjs from "html-to-draftjs";

import { actionCreators } from "./creators";
import {
  createBlogService,
  getBlogService,
  likeBlogService,
  updateBlogService,
} from "../../../services/api/blog.api";
import { blogMapper, userStorage } from "../../../utils";

import { routes } from "../../../app/router/routes";
import { store } from "../../index";

export const setTitle = (title) => (dispatch) => {
  dispatch(actionCreators.setTitle(title));
};

export const setContent = (content) => (dispatch) => {
  dispatch(actionCreators.setContent(content));
};

export const resetStore = () => (dispatch) => {
  dispatch(actionCreators.resetStore());
};

export const setSubmitType = (submitType) => (dispatch) => {
  dispatch(actionCreators.setSubmitType(submitType));
};

export const handleBlog =
  (pk, submitMode, submitType, history) => async (dispatch) => {
    const { blog } = store.getState();
    if (blog.content.getCurrentContent().hasText()) {
      dispatch(actionCreators.setSubmitType(submitType));
      const pks = { authorPk: userStorage.getUser().pk, blogPk: pk };
      let data = {
          title: blog.title,
          content: draftjsToHtml(
            convertToRaw(blog.content.getCurrentContent())
          ),
          is_published: submitType === "publish",
        },
        res,
        redirect;
      if (submitMode === "create") {
        res = await createBlogService({ ...data, author: pks.authorPk });
        redirect = routes.FEED;
      } else if (submitMode === "update") {
        res = await updateBlogService(pks.blogPk, data);
        redirect = routes.READ_BLOG(pks.blogPk);
      }
      if (res?.status === 200) {
        message.success(`Blog ${submitMode}d and ${submitType}ed`);
        history.push(redirect);
      } else {
        message.error("Some error occured !");
      }
      dispatch(actionCreators.setSubmitType(""));
      dispatch(actionCreators.setTitle(""));
      dispatch(actionCreators.setContent(EditorState.createEmpty()));
    } else {
      message.error("Please add some content !");
    }
  };

export const getBlog = (pk) => (dispatch) => {
  dispatch(actionCreators.setLoading(true));
  getBlogService(pk).then((res) => {
    if (res?.status === 200) {
      dispatch(actionCreators.setBlog(blogMapper(res?.data)));
    } else {
      message.error("Some error occured !");
    }
  });
  dispatch(actionCreators.setLoading(false));
};

export const getBlogData = (pk) => (dispatch) => {
  dispatch(actionCreators.setLoading(true));
  getBlogService(pk).then((res) => {
    if (res?.status === 200) {
      dispatch(actionCreators.setAuthor(res?.data?.author?.pk));
      dispatch(actionCreators.setTitle(res?.data?.title));
      dispatch(
        actionCreators.setContent(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(htmlToDraftjs(res?.data?.content))
          )
        )
      );
    } else {
      message.error("Some error occured !");
    }
  });
  dispatch(actionCreators.setLoading(false));
};

export const handleLike = (pk) => (dispatch) => {
  likeBlogService(pk, userStorage.getUser().pk).then((res) => {
    if (res?.status === 200) {
      dispatch(actionCreators.setBlog(blogMapper(res?.data)));
    }
  });
};

export const handleSave = (pk) => (dispatch) => {
  likeBlogService(pk).then((res) => {
    if (res === 200) {
      dispatch(actionCreators.setBlog(blogMapper(res?.data)));
    }
  });
};

export const handlePublish = (pk, mode) => (dispatch) => {
  likeBlogService(pk).then((res) => {
    if (res === 200) {
      dispatch(actionCreators.setBlog(blogMapper(res?.data)));
    }
  });
};
