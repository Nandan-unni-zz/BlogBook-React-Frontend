import React, { Component } from "react";
import { Form, Input } from "antd";
import { Redirect, Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import draftjsToHtml from "draftjs-to-html";

import "./Blogs.css";
import { Button, Navbar } from "../../components";
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
      status: "",
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
    let status;
    status = await createBlogAPI({
      title: this.state.title,
      content: draftjsToHtml(this.state.content),
      is_published: this.state.type === "publish",
      author: this.state.user.pk,
    });
    if (status === 200) this.setState({ isSuccess: true });
    else this.setState({ errMsg: "Some error occured." });
  };
  render() {
    return (
      <div className="CreateBlog">
        <Navbar>
          <Link to={routes.LOGOUT}>
            <i class="material-icons">power_settings_new</i>
            <br />
            <z>Logout</z>
          </Link>
          <Link to={routes.VIEW_WRITER(this.state.user.username)}>
            <i class="material-icons">account_circle</i>
            <br />
            <z>Profile</z>
          </Link>
          <Link to={routes.FEED}>
            <i class="material-icons">home</i>
            <br />
            <z>Feeds</z>
          </Link>
        </Navbar>
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
            <center>
              {!this.state.isSuccess ? (
                <err>{this.state.errMsg}</err>
              ) : (
                <Redirect to="/feed/" />
              )}
            </center>
            <br />

            <Form.Item>
              <div className="blog-create-nav">
                <Button
                  class="outline"
                  onClick={() => this.selectMethod("archive")}
                >
                  Archive
                </Button>{" "}
                &nbsp; &nbsp; &nbsp;
                <Button
                  class="normal"
                  onClick={() => this.selectMethod("publish")}
                >
                  Publish
                </Button>
              </div>
              <br />
              <center>
                <a href="/feed/">Discard</a>
              </center>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateBlog;
