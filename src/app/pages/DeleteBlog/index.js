import { Modal } from "antd";
import { store } from "../../../store";
import { deleteBlog } from "../../../store/common/actions";

const DeleteBlog = (pk, title, callback) => {
  return Modal.confirm({
    title: `Delete '${title}'`,
    content: `Are you sure you want to delete the blog '${title}'. This action cannot be reversed.`,
    centered: true,
    okText: `Delete`,
    okButtonProps: {
      type: "danger",
      size: "large",
      loading: store.getState().common.dltBlogPk === pk,
    },
    cancelButtonProps: { size: "large" },
    onOk: () => store.dispatch(deleteBlog(pk, callback)),
  });
};

export default DeleteBlog;
