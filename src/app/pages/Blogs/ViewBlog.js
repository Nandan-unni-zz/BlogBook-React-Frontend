import React, { Component } from "react";
import { message, Skeleton } from "antd";
import { Navbar, Stud } from "../../components";
import { Link } from "react-router-dom";

import { likeBlogAPI, saveBlogAPI, getBlogAPI } from "../../../services/blog";
import { writerImg } from "../../../static";
import { routes } from "../../router/routes";

class ViewBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      blog: {},
      loaded: false,
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleLike = async (pk) => {
    const res = await likeBlogAPI(pk, this.state.user.pk);
    this.setState({ blogs: res.data });
    getBlogAPI(this.props.match.params.pk).then((res) => {
      this.setState({ blog: res });
    });
  };
  handleSave = async (pk) => {
    const res = await saveBlogAPI(pk, this.state.user.pk);
    this.setState({ blogs: res.data });
    getBlogAPI(this.props.match.params.pk).then((res) => {
      this.setState({ blog: res });
    });
  };
  componentDidMount() {
    getBlogAPI(this.props.match.params.pk).then((res) => {
      this.setState({ blog: res, loaded: true });
    });
  }
  render() {
    const blog = this.state.blog;
    return (
      <div className="Feed">
        <Navbar backBtn feed profile logout />
        <div className="Blogs">
          {this.state.loaded ? (
            <div className="Blog">
              <div className="Blog-Head">
                <div className="Blog-Head-left">
                  <img
                    src={writerImg}
                    onError={(e) => (e.target.src = writerImg)}
                    alt="dp"
                  />
                  <span>
                    <h3>{blog.title}</h3>
                    <Link to={routes.VIEW_WRITER(blog.author.username)}>
                      {blog.author.username}
                    </Link>
                  </span>
                </div>
              </div>
              <div
                className="Blog-Body"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
              {blog.author.username !== this.state.user.username ? (
                <div className="Blog-Nav">
                  <div onClick={() => this.handleLike(blog.pk)}>
                    <Stud
                      type="Like"
                      icon="favorite"
                      theme="#ff6347"
                      count={blog.no_of_likes}
                      active={blog.likes.some(
                        (like) => like.username === this.state.user.username
                      )}
                    />
                  </div>
                  <div onClick={() => this.handleSave(blog.pk)}>
                    <Stud
                      type="Save"
                      icon="bookmark"
                      theme="#1e90ff"
                      active={blog.saves.some(
                        (like) => like.username === this.state.user.username
                      )}
                    />
                  </div>
                </div>
              ) : (
                <div className="Blog-Nav">
                  <div onClick={() => this.handleLike(blog.pk)}>
                    <Stud
                      type="Like"
                      icon="favorite"
                      theme="#ff6347"
                      count={blog.no_of_likes}
                      active={blog.likes.some(
                        (like) => like.username === this.state.user.username
                      )}
                    />
                  </div>
                  <Link to={routes.EDIT_BLOG(blog.pk)}>
                    <Stud type="Edit" icon="edit" theme="#1e90ff" active />
                  </Link>
                  <div
                    onClick={() =>
                      message.warn("This button is currently unavailable !")
                    }
                  >
                    <Stud
                      type={blog.is_published ? "Archive" : "Publish"}
                      icon={blog.is_published ? "archive" : "library_books"}
                      theme="#008000"
                      active
                    />
                  </div>
                  <Link to={routes.DELETE_BLOG(blog.pk)}>
                    <Stud type="Delete" icon="delete" theme="#ff6347" active />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="Blog">
              <Skeleton />
            </div>
          )}
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default ViewBlog;
