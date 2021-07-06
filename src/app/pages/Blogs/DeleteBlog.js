import React, { Component } from "react";
import { Form } from "antd";
import { Redirect } from "react-router-dom";

import { Button, Logo, Portal } from "../../components";
import { deleteBlogAPI, getBlogAPI } from "../../../services/blog";

class DeleteBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      blog: {},
      loaded: false,
      errMsg: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = async () => {
    deleteBlogAPI(this.state.blog.pk);
    const response = await deleteBlogAPI(this.state.blog.pk);
    console.log(response.status);
    if (response.status === 204) this.setState({ isSuccess: true });
    else this.setState({ errMsg: "Invalid content." });
  };
  componentDidMount() {
    getBlogAPI(this.props.match.params.pk).then((res) => {
      this.setState({ blog: res, loaded: true });
    });
  }
  render() {
    const blog = this.state.blog;
    return (
      <div className="DeleteAccount">
        {this.state.loaded ? (
          <div>
            {this.state.user.username === blog.author.username ? (
              <div>
                <Logo />
                <br />
                <br />
                <br />
                <Portal>
                  <Form onFinish={this.handleSubmit}>
                    <center>
                      <h2>Delete Blog</h2>
                    </center>
                    <br />
                    <p>
                      Are you sure you want to delete the blog '
                      <l>{blog.title}</l>' ?
                    </p>
                    <br />
                    <Form.Item>
                      <center>
                        {!this.state.isSuccess ? (
                          <err>{this.state.errMsg}</err>
                        ) : (
                          <Redirect
                            to={`/writer/view/${this.state.user.username}`}
                          />
                        )}
                      </center>
                      <br />
                      <center>
                        <Button class="danger">Delete Blog</Button>
                        <br />
                        <a href={`/writer/view/${this.state.user.username}`}>
                          Cancel
                        </a>
                      </center>
                    </Form.Item>
                  </Form>
                </Portal>
              </div>
            ) : (
              <Redirect to="/feed/" />
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default DeleteBlog;
