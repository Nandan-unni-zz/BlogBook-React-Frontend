import "./index.css";
import "./theme.css"; // dark - light theme switching
import "antd/dist/antd.css"; // antd
import "./antd.css"; // antd override
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; // RichText Editor css

import { Provider } from "react-redux";

import Router from "./router";
import { store } from "../store";

const BlogBook = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default BlogBook;
