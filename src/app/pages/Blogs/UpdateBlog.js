import React, { Component } from "react";
import { Form, Input, message, Button } from "antd";
import { Redirect } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState, convertToRaw } from "draft-js";

import draftjsToHtml from "draftjs-to-html";
import htmlToDraftjs from "html-to-draftjs";

import { Navbar } from "../../components";
import { updateBlogAPI, getBlogAPI } from "../../../services/blog";
import { routes } from "../../router/routes";

class EditBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      blog: {},
      title: "",
      content: EditorState.createEmpty(),
      type: "",
      loaded: false,
      isPublishing: false,
      isArchiving: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
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
    if (this.state.content.getCurrentContent().hasText()) {
      let response;
      this.setState({
        isPublishing: this.state.type === "publish",
        isArchiving: this.state.type === "archive",
      });
      response = await updateBlogAPI(this.props.match.params.pk, {
        title: this.state.title,
        content: draftjsToHtml(
          convertToRaw(this.state.content.getCurrentContent())
        ),
        is_published: this.state.type === "publish",
      });
      if (response.status === 200) {
        message.success("Blog updated !");
        this.setState({ isSuccess: true });
      } else message.error("Some error occured !");
      this.setState({
        isPublishing: false,
        isArchiving: false,
      });
    } else {
      message.error("Please add some content !");
    }
  };
  formRef = React.createRef();
  componentDidMount = () => {
    getBlogAPI(this.props.match.params.pk).then((res) => {
      this.setState({ blog: res, loaded: true });
      this.setState({
        title: this.state.blog.title,
        content: EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraftjs(this.state.blog.content)
          )
        ),
      });
      this.formRef?.current?.setFieldsValue({
        title: this.state.blog.title,
      });
    });
  };
  render() {
    return (
      <div className="EditBlog">
        {this.state.loaded ? (
          <div>
            {this.state.blog.author.username === this.state.user.username ? (
              <div>
                <Navbar feed profile logout />
                <br />
                <br />
                <div className="blog-create">
                  <Form onFinish={this.handleSubmit} ref={this.formRef}>
                    <center>
                      <h2>Edit Blog</h2>
                    </center>
                    <br />

                    <label for="title">Title</label>
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
                      <Input
                        onChange={this.handleChange}
                        defaultValue={this.state.title}
                      />
                    </Form.Item>
                    <br />

                    <label for="content">Content</label>
                    <br />
                    <Editor
                      editorState={this.state.content}
                      onEditorStateChange={this.handleContentChange}
                      editorClassName="richEditor"
                    />

                    <center>
                      {!this.state.isSuccess ? (
                        <err>{this.state.errMsg}</err>
                      ) : (
                        <Redirect to={routes.VIEW_BLOG(this.state.blog.pk)} />
                      )}
                    </center>
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
                          Save & Archive
                        </Button>
                        &nbsp; &nbsp; &nbsp;
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={this.state.isPublishing}
                          disabled={this.state.isArchiving}
                          onClick={() => this.selectMethod("publish")}
                        >
                          Save & Publish
                        </Button>
                      </div>
                      <br />
                      <center>
                        <a href={`/writer/view/${this.state.user.username}`}>
                          Cancel
                        </a>
                      </center>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            ) : (
              <Redirect to={`/feed/`} />
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default EditBlog;
