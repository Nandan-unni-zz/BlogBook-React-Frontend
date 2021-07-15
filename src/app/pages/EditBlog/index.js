import "./index.css";

import { Component } from "react";
import { Navbar } from "../../components";

class EditBlog extends Component {
  render() {
    return (
      <div className="blog-portal-wrapper">
        <Navbar feed profile logout />
      </div>
    );
  }
}

export default EditBlog;
