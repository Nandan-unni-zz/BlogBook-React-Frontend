import "./index.css";
import "./theme.css"; // dark - light theme switching
import "antd/dist/antd.css"; // antd
import "./antd.css"; // antd override
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; // RichText Editor css

import Router from "./router";

const BlogBook = () => {
  return <Router />;
};

export default BlogBook;
