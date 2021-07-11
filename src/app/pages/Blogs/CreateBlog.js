import React, { Component } from "react";
import { Form, Input, message, Button } from "antd";
import { Editor } from "react-draft-wysiwyg";
import draftjsToHtml from "draftjs-to-html";

import "./Blogs.css";
import { Navbar } from "../../components";
import { createBlogAPI } from "../../../services/blog";
import { routes } from "../../router/routes";

class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      title: "",
      content: "",
      type: "",
      isPublishing: false,
      isArchiving: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleContentChange = (content) => {
    this.setState({ content });
  };
  selectMethod = (method) => {
    this.setState({ type: method });
  };
  handleSubmit = async () => {
    if (this.state.content !== "") {
      let status;
      this.setState({
        isPublishing: this.state.type === "publish",
        isArchiving: this.state.type === "archive",
      });
      status = await createBlogAPI({
        title: this.state.title,
        content: draftjsToHtml(this.state.content),
        is_published: this.state.type === "publish",
        author: this.state.user.pk,
      });
      if (status === 200) {
        message.success("New blog ", this.state.type, " !");
        window.location.href = routes.FEED;
      } else this.setState({ errMsg: "Some error occured." });
      this.setState({
        isPublishing: false,
        isArchiving: false,
      });
    } else {
      message.error("Please add some content !");
    }
  };
  render() {
    return (
      <div className="CreateBlog">
        <Navbar feed profile logout />
        <br />
        <br />
        <div className="blog-create">
          <Form onFinish={this.handleSubmit}>
            <center>
              <h2>Create Blog</h2>
            </center>
            <br />

            <label htmlFor="title">Title</label>
            <br />
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  min: 1,
                  max: 40,
                  message: "Enter 1-40 characters",
                },
              ]}
            >
              <Input onChange={this.handleChange} />
            </Form.Item>
            <br />

            <label>Content</label>
            <Editor
              onChange={this.handleContentChange}
              editorClassName="richEditor"
            />
            <br />

            <Form.Item>
              <div className="blog-create-nav">
                <Button
                  type="ghost"
                  htmlType="submit"
                  disabled={this.state.isPublishing}
                  loading={this.state.isArchiving}
                  onClick={() => this.selectMethod("archive")}
                >
                  Archive
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.isPublishing}
                  disabled={this.state.isArchiving}
                  onClick={() => this.selectMethod("publish")}
                >
                  Publish
                </Button>
              </div>
              <br />
              <center>
                <a href={routes.FEED}>Discard</a>
              </center>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateBlog;
