import React, { Component } from "react";
import { message, Skeleton } from "antd";
import { Button, Navbar } from "../../components";
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
        <Navbar>
          <a href={`/writer/view/${this.state.user.username}`}>
            <i class="material-icons">account_circle</i>
            <br />
            <z>Profile</z>
          </a>
          <a href="/feed/">
            <i class="material-icons">home</i>
            <br />
            <z>Feed</z>
          </a>
        </Navbar>
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
                  <span>
                    <p>{blog.no_of_likes}</p>
                    {blog.likes.some(
                      (like) => like.username === this.state.user.username
                    ) ? (
                      <button
                        class="material-icons liked"
                        onClick={() => this.handleLike(blog.pk)}
                      >
                        favorite
                      </button>
                    ) : (
                      <button
                        class="material-icons not-liked"
                        onClick={() => this.handleLike(blog.pk)}
                      >
                        favorite_border
                      </button>
                    )}
                  </span>
                  {blog.saves.some(
                    (save) => save.username === this.state.user.username
                  ) ? (
                    <button
                      className="material-icons bookmarked"
                      onClick={() => this.handleSave(blog.pk)}
                    >
                      bookmark
                    </button>
                  ) : (
                    <button
                      class="material-icons not-bookmarked"
                      onClick={() => this.handleSave(blog.pk)}
                    >
                      bookmark_border
                    </button>
                  )}
                </div>
              ) : (
                <div className="Blog-View-Nav">
                  <Button class="normal" href={routes.EDIT_BLOG(blog.pk)}>
                    Edit Blog
                  </Button>
                  <Button class="danger" href={routes.DELETE_BLOG(blog.pk)}>
                    Delete Blog
                  </Button>
                  <Button
                    class="normal"
                    onClick={() =>
                      message.warning("This button is currently unavailable !")
                    }
                  >
                    {blog.is_published ? "Archive Blog" : "Publish Blog"}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="Blog">
              <Skeleton />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ViewBlog;
