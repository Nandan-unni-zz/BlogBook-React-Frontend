import React, { Component } from "react";
import { Tooltip } from "antd";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "./Writers.css";
import { routes } from "../../router/routes";
import { Button, Navbar } from "../../components";
import {
  logoutWriterAPI,
  getWriterAPI,
  followWriterAPI,
} from "../../../services/writer";
import { writerImg } from "../../../static";

function Skltn() {
  return (
    <span>
      <div className="Profile">
        <center>
          <Skeleton circle={true} size="large" width={"22.5vh"} />
        </center>
        <div className="Prof-dtl">
          <center>
            <p>
              <Skeleton width={"20vw"} />
            </p>
            <br />
            <p>
              <Skeleton width={"5vw"} />
            </p>
            &nbsp; <b>|</b> &nbsp;
            <p>
              <Skeleton width={"6vw"} />
            </p>
            <div className="Prof-math">
              <a href="?tab=published">
                <div className="math-dtl">
                  <p>
                    <Skeleton width={"3vw"} />
                  </p>
                  <br />
                  <p>Blogs</p>
                </div>
              </a>
              <a href="?tab=following">
                <div className="math-dtl">
                  <p>
                    <Skeleton width={"3vw"} />
                  </p>
                  <br />
                  <p>Following</p>
                </div>
              </a>
              <a href="?tab=followers">
                <div className="math-dtl">
                  <p>
                    <Skeleton width={"3vw"} />
                  </p>
                  <br />
                  <p>Followers</p>
                </div>
              </a>
            </div>
            <p className="bio">
              <Skeleton width={"30vw"} />
            </p>
            <br />
          </center>
          <br />
        </div>
        <div className="Prof-ctrl">
          <div className="ctrl-edit">
            <Skeleton height={"5vh"} width={"15vh"} />
          </div>
          <div className="ctrl-delete">
            <Skeleton height={"5vh"} width={"15vh"} />
          </div>
        </div>
      </div>
      <br />
      <div className="Prof-divider"></div>
      <div className="Prof-Nav">
        <div className={`Prof-Nav-item`}>
          <a href="?tab=following">
            <Skeleton height={"4vh"} width={"8vh"} />
          </a>
        </div>
        <div className={`Prof-Nav-item`}>
          <a href="?tab=followers">
            <Skeleton height={"4vh"} width={"8vh"} />
          </a>
        </div>
        <div className={`Prof-Nav-item`}>
          <a href="?tab=published">
            <Skeleton height={"4vh"} width={"8vh"} />
          </a>
        </div>
        <div className={`Prof-Nav-item`}>
          <a href="?tab=archived">
            <Skeleton height={"4vh"} width={"8vh"} />
          </a>
        </div>
        <div className={`Prof-Nav-item`}>
          <a href="?tab=saved">
            <Skeleton height={"4vh"} width={"8vh"} />
          </a>
        </div>
      </div>
    </span>
  );
}

class ViewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      writer: {},
      loaded: false,
      tab: "",
      following: "",
      followers: "",
      published: "",
      archived: "",
      saved: "",
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }
  handleLogout = () => {
    logoutWriterAPI(this.state.user.pk);
    localStorage.removeItem("user");
  };
  handleFollow = async () => {
    const response = await followWriterAPI(
      this.state.user.pk,
      this.state.writer.pk
    );
    if (response.status === 200)
      getWriterAPI(this.props.match.params.username).then((res) => {
        this.setState({ writer: res, loaded: true });
      });
  };
  componentDidMount() {
    this.handleTabChange();
  }
  handleTabChange = () => {
    getWriterAPI(this.props.match.params.username).then((res) => {
      const tab = new URLSearchParams(this.props.location.search).get("tab");
      this.setState({
        writer: res,
        loaded: true,
        [tab]: " item-active",
        tab: tab,
      });
      if (
        ["following", "followers", "archived", "saved"].indexOf(
          this.state.tab
        ) < 0
      )
        this.setState({ published: " item-active", tab: "published" });
      else this.setState({ published: "" });
      if (!(this.state.writer.username === this.state.user.username)) {
        if (["archived", "saved"].indexOf(this.state.tab) > 0) {
          this.setState({ published: " item-active", tab: "published" });
        }
      }
      ["following", "followers", "published", "archived", "saved"].forEach(
        (tab) => {
          if (!(tab === this.state.tab)) {
            this.setState({ [tab]: "" });
          }
        }
      );
    });
  };
  render() {
    const writer = this.state.writer;
    const user = this.state.user;
    return (
      <div className="ViewAccount">
        <Navbar createBlog feed logout />
        {this.state.loaded ? (
          <span>
            <div className="Profile">
              <div className="Prof-img">
                <center>
                  <img
                    src={writerImg}
                    onError={({ target }) => (target.src = writerImg)}
                    alt="DP"
                  />
                </center>
              </div>
              <div className="Prof-dtl">
                <center>
                  <p className="nm">{writer?.name}</p>
                  <br />
                  <Tooltip overlay="Username">
                    <span className="unm">{writer?.username} </span>
                  </Tooltip>
                  {user.username === writer?.username ? (
                    <span>
                      &nbsp; <b>|</b> &nbsp;
                      <Tooltip overlay="Email">
                        <span className="eml">{writer?.email}</span>
                      </Tooltip>
                    </span>
                  ) : (
                    <span></span>
                  )}

                  <div className="Prof-math">
                    <Link to="?tab=published" onClick={this.handleTabChange}>
                      <div className="math-dtl">
                        <p className="no">{writer?.no_of_blogs}</p>
                        <p className="tg">Blogs</p>
                      </div>
                    </Link>
                    <Link to="?tab=following" onClick={this.handleTabChange}>
                      <div className="math-dtl">
                        <p className="no">{writer?.no_of_following}</p>
                        <p className="tg">Following</p>
                      </div>
                    </Link>
                    <Link to="?tab=followers" onClick={this.handleTabChange}>
                      <div className="math-dtl">
                        <p className="no">{writer?.no_of_followers}</p>
                        <p className="tg">Followers</p>
                      </div>
                    </Link>
                  </div>

                  <Tooltip overlay="Bio">
                    <p className="bio">{writer.bio}</p>
                  </Tooltip>
                  <br />
                </center>
                <br />
              </div>
              {user.username === writer.username ? (
                <div className="Prof-ctrl">
                  <div className="ctrl-edit">
                    <Link to={routes.EDIT_WRITER(writer.username)}>
                      Edit <span>Account</span>
                    </Link>
                  </div>
                  <div className="ctrl-delete">
                    <Link to={routes.DELETE_WRITER(writer.username)}>
                      Delete <span>Account</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="Prof-ctrl">
                  <div className="ctrl-edit">
                    {writer.followers.some(
                      (follower) =>
                        follower.username === this.state.user.username
                    ) ? (
                      <Button className="outline" onClick={this.handleFollow}>
                        Unfollow
                      </Button>
                    ) : (
                      <Button className="normal" onClick={this.handleFollow}>
                        Follow
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="Prof-Nav">
              <div className={`Prof-Nav-item${this.state.following}`}>
                <Link to="?tab=following" onClick={this.handleTabChange}>
                  <i className="material-icons">person</i>
                  <p className="tbz">Following</p>
                </Link>
              </div>
              <div className={`Prof-Nav-item${this.state.followers}`}>
                <Link to="?tab=followers" onClick={this.handleTabChange}>
                  <i className="material-icons">people</i>
                  <br />
                  <p className="tbz">Followers</p>
                </Link>
              </div>
              <div className={`Prof-Nav-item${this.state.published}`}>
                <Link to="?tab=published" onClick={this.handleTabChange}>
                  <i className="material-icons">library_books</i>
                  <br />
                  <p className="tbz">Published</p>
                </Link>
              </div>
              {user.username === writer.username && (
                <>
                  <div className={`Prof-Nav-item${this.state.archived}`}>
                    <Link to="?tab=archived" onClick={this.handleTabChange}>
                      <i className="material-icons">archive</i>
                      <br />
                      <p className="tbz">Archived</p>
                    </Link>
                  </div>
                  <div className={`Prof-Nav-item${this.state.saved}`}>
                    <Link to="?tab=saved" onClick={this.handleTabChange}>
                      <i className="material-icons">bookmarks</i>
                      <br />
                      <p className="tbz">Saved</p>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </span>
        ) : (
          <Skltn />
        )}
        <br />

        {this.state.tab === "following" && (
          <div className="prof-tab-cards">
            {writer.following.map((avatar) => (
              <a
                href={routes.VIEW_WRITER(avatar.username)}
                key={avatar.username}
              >
                <div className="prof-tab-card">
                  <img src={writerImg} alt="authorDP" />
                  <div className="prof-tab-card-content">
                    <h3>{avatar.username}</h3>
                    <time>{avatar.name}</time>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {this.state.tab === "followers" && (
          <div className="prof-tab-cards">
            {writer.followers.map((avatar) => (
              <a
                href={routes.VIEW_WRITER(avatar.username)}
                key={avatar.username}
              >
                <div className="prof-tab-card">
                  <img src={writerImg} alt="authorDP" />
                  <div className="prof-tab-card-content">
                    <h3>{avatar.username}</h3>
                    <time>{avatar.name}</time>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {this.state.tab === "published" && (
          <div className="prof-tab-cards">
            {writer.pub_blogs.map((blog) => (
              <Link to={routes.VIEW_BLOG(blog.pk)} key={blog.pk}>
                <div className="prof-tab-card">
                  <img src={writerImg} alt="authorDP" />
                  <div className="prof-tab-card-content">
                    <h3>{blog.title}</h3>
                    <time>
                      {blog.likes.some(
                        (like) => like.username === user.username
                      ) ? (
                        <button className="material-icons liked">
                          favorite
                        </button>
                      ) : (
                        <button className="material-icons not-liked">
                          favorite_border
                        </button>
                      )}
                      {blog.no_of_likes} Likes
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {user.username === writer.username && (
          <>
            {this.state.tab === "archived" && (
              <div className="prof-tab-cards">
                {writer.arch_blogs.map((blog) => (
                  <Link to={routes.VIEW_BLOG(blog.pk)} key={blog.pk}>
                    <div className="prof-tab-card">
                      <img src={writerImg} alt="authorDP" />
                      <div className="prof-tab-card-content">
                        <h3>{blog.title}</h3>
                        <time>
                          {blog.likes.some(
                            (like) => like.username === user.username
                          ) ? (
                            <button className="material-icons liked">
                              favorite
                            </button>
                          ) : (
                            <button className="material-icons not-liked">
                              favorite_border
                            </button>
                          )}
                          {blog.no_of_likes} Likes
                        </time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {this.state.tab === "saved" && (
              <div className="prof-tab-cards">
                {writer.saved_blogs.map((blog) => (
                  <Link to={routes.VIEW_BLOG(blog.pk)} key={blog.pk}>
                    <div className="prof-tab-card">
                      <img src={writerImg} alt="authorDP" />
                      <div className="prof-tab-card-content">
                        <h3>{blog.title}</h3>
                        <time>
                          {blog.likes.some(
                            (like) => like.username === user.username
                          ) ? (
                            <button className="material-icons liked">
                              favorite
                            </button>
                          ) : (
                            <button className="material-icons not-liked">
                              favorite_border
                            </button>
                          )}
                          {blog.no_of_likes} Likes
                        </time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default ViewAccount;
