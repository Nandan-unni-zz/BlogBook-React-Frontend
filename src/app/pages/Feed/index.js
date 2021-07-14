import "./index.css";

import { Component } from "react";
import { Dropdown, Menu, Popover, Row } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import { AccountCard, Banner, Navbar, Stud } from "../../components";
import { FeedSkeleton } from "../../skeletons";
import { ellipsis, userStorage } from "../../../utils";
import actions from "../../../store/blog/actions";
import { routes } from "../../router/routes";
import { writerPlaceholder } from "../../../static";

const { fetchFeed } = actions;
class Feed extends Component {
  state = {
    user: userStorage.getUser(),
  };

  componentDidMount() {
    this.props.fetchFeed();
    console.log(this.props.blogs);
  }

  render() {
    return (
      <div className="Feed">
        <Banner />
        <Navbar api createBlog search profile logout />
        <div className="Blogs">
          {!this.props?.blogs?.loadingFeed ? (
            this.props?.blogs?.blogs?.map((blog) => (
              <div className="Blog" key={blog.pk}>
                <div className="Blog-Head">
                  <div className="Blog-Head-left">
                    <img
                      src={blog.author.dp}
                      onError={(e) => (e.target.src = writerPlaceholder)}
                      alt="dp"
                    />
                    <span>
                      <h3>{blog.title}</h3>
                      <Popover
                        content={
                          <AccountCard
                            img={blog.author.dp}
                            username={blog.author.username}
                            name={blog.author.name}
                          />
                        }
                        style={{ padding: 0 }}
                      >
                        <Link to={routes.PROFILE(blog.author.username)}>
                          {blog.author.username}
                        </Link>
                      </Popover>
                    </span>
                  </div>
                  <div className="Blog-Head-right">
                    {blog.author.username === this.state.user.username ? (
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item key="view" className="Blog-drop">
                              <Link to={routes.VIEW_BLOG(blog.pk)}>
                                <Row align="middle">
                                  <FeatherIcon
                                    icon="eye"
                                    size={15}
                                    className="Blog-drop-item drop-view"
                                  />
                                  View Blog
                                </Row>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="edit" className="Blog-drop">
                              <Link to={routes.EDIT_BLOG(blog.pk)}>
                                <Row align="middle">
                                  <FeatherIcon
                                    icon="edit-2"
                                    size={15}
                                    className="Blog-drop-item drop-edit"
                                  />
                                  Edit Blog
                                </Row>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="delete" className="Blog-drop">
                              <Link to={routes.EDIT_BLOG(blog.pk)}>
                                <Row align="middle">
                                  <FeatherIcon
                                    icon="trash-2"
                                    size={15}
                                    className="Blog-drop-item drop-delete"
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
              </div>
            ))
          ) : (
            <FeedSkeleton />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth, blogs: state.blog };
};

export default connect(mapStateToProps, { fetchFeed })(Feed);
