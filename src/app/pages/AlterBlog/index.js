import { Modal } from "antd";
import { store } from "../../../store";
import { alterBlog } from "../../../store/common/actions";

const AlterBlog = (pk, title, isPublished, callback) => {
  return Modal.confirm({
    title: `${isPublished ? "Archive" : "Publish"} '${title}'`,
    content: `Are you sure you want to ${
      isPublished ? "archive" : "publish"
    } the blog '${title}'.`,
    centered: true,
    okText: `${isPublished ? "Archive" : "Publish"}`,
    okButtonProps: {
      type: "primary",
      size: "large",
      loading: store.getState().common.altBlogPk === pk,
    },
    cancelButtonProps: { size: "large" },
    onOk: () => store.dispatch(alterBlog(pk, isPublished, callback)),
  });
};

export default AlterBlog;
