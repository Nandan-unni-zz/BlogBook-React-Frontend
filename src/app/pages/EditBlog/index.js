import "./index.css";

import { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { connect } from "react-redux";

import { Navbar } from "../../components";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";
import {
  resetStore,
  setTitle,
  setContent,
  setSubmitType,
  handleBlog,
  getBlogData,
} from "../../../store/blog/actions";
import { UpdateBlogSkeleton } from "../../skeletons";
import { userStorage } from "../../../utils";

class UpdateBlog extends Component {
  state = {
    submitType: "",
    user: userStorage.getUser(),
  };

  handle403() {
    message.error("You can only edit your own blogs!");
    this.props.history.push(routes.READ_BLOG(this.props.match.params.blogId));
  }

  componentDidMount() {
    this.props.getBlogData(this.props.match.params.blogId);
  }

  componentWillUnmount() {
    this.props.resetStore();
  }

  render() {
    return (
      <div className="blog-portal-wrapper">
        <Navbar feed profile logout />
        <div className="blog-portal">
          <h2 className="blog-portal-head">Edit Blog</h2>
          {this.props.blog.loading ? (
            <UpdateBlogSkeleton />
          ) : !(this.state.user.pk === this?.props?.blog?.author) ? (
            this.handle403()
          ) : (
            <Form
              onFinish={() =>
                this.props.handleBlog(
                  this.props.match.params.blogId,
                  "update",
                  this.state.submitType,
                  this.props.history
                )
              }
              scrollToFirstError
              layout="vertical"
              requiredMark={false}
              key={!this?.props?.blog?.titleChanged && this?.props?.blog?.title}
              // initialValues={{ title: this?.props?.blog?.title }}
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    min: 1,
                    max: 40,
                    message: "Title must be 1-40 characters",
                  },
                ]}
              >
                <Input
                  defaultValue={this?.props?.blog?.title}
                  onChange={(e) => this.props.setTitle(e.target.value)}
                  size="large"
                  placeholder="Type your title here..."
                />
              </Form.Item>

              <Form.Item label="Content">
                <Editor
                  editorState={this.props.blog.content}
                  onEditorStateChange={(val) => this.props.setContent(val)}
                  wrapperClassName="richWrapper"
                  editorClassName="richEditor"
                  toolbarClassName="richToolbar"
                  placeholder="Type your content here..."
                />
              </Form.Item>

              <Form.Item>
                <footer>
                  <div className="blog-portal-nav">
                    <Button
                      htmlType="submit"
                      loading={this.props.blog.submitType === "archive"}
                      disabled={this.props.blog.submitType === "publish"}
                      type="ghost"
                      size="large"
                      onClick={() => this.setState({ submitType: "archive" })}
                    >
                      Archive
                    </Button>
                    <Button
                      htmlType="submit"
                      loading={this.props.blog.submitType === "publish"}
                      disabled={this.props.blog.submitType === "archive"}
                      type="primary"
                      size="large"
                      onClick={() => this.setState({ submitType: "publish" })}
                    >
                      Publish
                    </Button>
                  </div>
                  <Link to={routes.READ_BLOG(this.props.match.params.blogId)}>
                    Cancel
                  </Link>
                </footer>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { blog: state.blog };
};

export default connect(mapStateToProps, {
  setTitle,
  setContent,
  setSubmitType,
  handleBlog,
  getBlogData,
  resetStore,
})(UpdateBlog);
