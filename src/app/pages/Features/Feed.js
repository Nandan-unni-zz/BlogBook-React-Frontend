import React, { Component } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import { Menu, Dropdown, Row } from "antd";

import "./Feed.css";
import { Logo, Navbar, Footer } from "../../components";
import { logoutWriterAPI } from "../../../services/writer";
import { likeBlogAPI, saveBlogAPI, feedAPI } from "../../../services/blog";
import { ellipsis } from "../../../utils";
import { routes } from "../../router/routes";
import { writerImg } from "../../../static";

function Skltn() {
  return (
    <div className="Sk">
      <Skeleton height={"3.5vh"} width={"20vw"} />
      <br />
      <Skeleton height={"2vh"} width={"10vw"} />
      <br />
      <br />
      <Skeleton height={"3vh"} width={"80vw"} />
      <br />
      <Skeleton height={"3vh"} width={"80vw"} />
      <br />
      <Skeleton height={"3vh"} width={"80vw"} />
      <br />
      <Skeleton height={"3vh"} width={"80vw"} />
      <br />
      <Skeleton height={"3vh"} width={"80vw"} />
      <br />
      <br />
      <div className="Sk-Nav">
        <div className="Sk-left">
          <Skeleton height={"5vh"} width={"7.5vh"} />
          <Skeleton circle={true} height={"5vh"} width={"5vh"} />
        </div>
        <div className="Sk-right">
          <Skeleton circle={true} height={"5vh"} width={"5vh"} />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      a: 91,
      b: 92,
      blogs: [],
      loaded: false,
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    feedAPI().then((result) => {
      this.setState({ blogs: result, loaded: true });
    });
  }
  handleLike = async (pk) => {
    const res = await likeBlogAPI(pk, this.state.user.pk);
    this.setState({ blogs: res.data });
  };
  handleSave = async (pk) => {
    const res = await saveBlogAPI(pk, this.state.user.pk);
    this.setState({ blogs: res.data });
  };
  handleLogout = () => {
    logoutWriterAPI(this.state.user.pk);
    localStorage.removeItem("user");
  };
  render() {
    const user = this.state.user;
    return (
      <div className="Feed">
        <Logo></Logo>
        <Navbar>
          <Link to={routes.LOGOUT} onClick={this.handleLogout}>
            <i class="material-icons">power_settings_new</i>
            <br />
            <z>Logout</z>
          </Link>
          <Link to={routes.VIEW_WRITER(user.username)}>
            <i class="material-icons">account_circle</i>
            <br />
            <z>Profile</z>
          </Link>
          <Link to={routes.SEARCH}>
            <i class="material-icons">person_add_alt_1</i>
            <br />
            <z>Search</z>
          </Link>
          <Link to={routes.CREATE_BLOG}>
            <i class="material-icons">create</i>
            <br />
            <z>New Blog</z>
          </Link>
          {user.is_superuser && (
            <Link to="https://blogbookapi.herokuapp.com">
              <i class="material-icons">construction</i>
              <br />
              <z>API</z>
            </Link>
          )}
        </Navbar>
        <div className="Blogs">
          {this.state.loaded ? (
            this.state.blogs.map((blog) => (
              <div className="Blog" key={blog.pk}>
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
                  <div className="Blog-Head-right">
                    {blog.author.username === user.username ? (
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item>
                              <Link to={routes.VIEW_BLOG(blog.pk)}>
                                <Row align="middle">
                                  <FeatherIcon
                                    icon="eye"
                                    size={15}
                                    style={{ marginRight: "5px" }}
                                  />
                                  View Blog
                                </Row>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link to={routes.EDIT_BLOG(blog.pk)}>
                                <Row align="middle">
                                  <FeatherIcon
                                    icon="edit-2"
                                    size={15}
                                    style={{ marginRight: "5px" }}
                                  />
                                  Edit Blog
                                </Row>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link to={routes.DELETE_BLOG(blog.pk)}>
                                <Row align="middle">
                                  <FeatherIcon
                                    icon="trash-2"
                                    size={15}
                                    style={{ marginRight: "5px" }}
                                  />
                                  Delete Blog
                                </Row>
                              </Link>
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <FeatherIcon icon="more-vertical" />
                      </Dropdown>
                    ) : (
                      <Link to={routes.VIEW_BLOG(blog.pk)}>
                        <button className="Blog-Read">Read</button>
                      </Link>
                    )}
                  </div>
                </div>
                <div
                  className="Blog-Body"
                  // dangerouslySetInnerHTML={{ __html: blog.content }}
                >
                  {window.screen.width > 600 ? (
                    <p>{ellipsis(blog.summary, 600)}</p>
                  ) : (
                    <p>{ellipsis(blog.summary, 300)}</p>
                  )}
                </div>
                <div className="Blog-Nav">
                  <span>
                    <p>{blog.no_of_likes}</p>
                    {blog.likes.some(
                      (like) => like.username === user.username
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
                    (save) => save.username === user.username
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
              </div>
            ))
          ) : (
            <>
              <Skltn />
              <Skltn />
            </>
          )}
        </div>
        <br />
        <br />
        <hr />
        <Footer />
      </div>
    );
  }
}

export default Feed;
