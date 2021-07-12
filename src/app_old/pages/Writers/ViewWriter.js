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
            <nm>
              <Skeleton width={"20vw"} />
            </nm>
            <br />
            <unm>
              <Skeleton width={"5vw"} />
            </unm>
            &nbsp; <b>|</b> &nbsp;
            <eml>
              <Skeleton width={"6vw"} />
            </eml>
            <div className="Prof-math">
              <a href="?tab=published">
                <div className="math-dtl">
                  <n>
                    <Skeleton width={"3vw"} />
                  </n>
                  <br />
                  <t>Blogs</t>
                </div>
              </a>
              <a href="?tab=following">
                <div className="math-dtl">
                  <n>
                    <Skeleton width={"3vw"} />
                  </n>
                  <br />
                  <t>Following</t>
                </div>
              </a>
              <a href="?tab=followers">
                <div className="math-dtl">
                  <n>
                    <Skeleton width={"3vw"} />
                  </n>
                  <br />
                  <t>Followers</t>
                </div>
              </a>
            </div>
            <bio>
              <Skeleton width={"30vw"} />
            </bio>
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
                  <nm>{writer.name}</nm>
                  <br />
                  <Tooltip overlay="Username">
                    <unm>{writer.username} </unm>
                  </Tooltip>
                  {user.username === writer.username ? (
                    <span>
                      &nbsp; <b>|</b> &nbsp;
                      <Tooltip overlay="Email">
                        <eml>{writer.email}</eml>
                      </Tooltip>
                    </span>
                  ) : (
                    <span></span>
                  )}

                  <div className="Prof-math">
                    <Link to="?tab=published" onClick={this.handleTabChange}>
                      <div className="math-dtl">
                        <n>{writer.no_of_blogs}</n>
                        <br />
                        <t>Blogs</t>
                      </div>
                    </Link>
                    <Link to="?tab=following" onClick={this.handleTabChange}>
                      <div className="math-dtl">
                        <n>{writer.no_of_following}</n>
                        <br />
                        <t>Following</t>
                      </div>
                    </Link>
                    <Link to="?tab=followers" onClick={this.handleTabChange}>
                      <div className="math-dtl">
                        <n>{writer.no_of_followers}</n>
                        <br />
                        <t>Followers</t>
                      </div>
                    </Link>
                  </div>

                  <Tooltip overlay="Bio">
                    <bio>{writer.bio}</bio>
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
                  <i class="material-icons">person</i>
                  <br />
                  <z>Following</z>
                </Link>
              </div>
              <div className={`Prof-Nav-item${this.state.followers}`}>
                <Link to="?tab=followers" onClick={this.handleTabChange}>
                  <i class="material-icons">people</i>
                  <br />
                  <z>Followers</z>
                </Link>
              </div>
              <div className={`Prof-Nav-item${this.state.published}`}>
                <Link to="?tab=published" onClick={this.handleTabChange}>
                  <i class="material-icons">library_books</i>
                  <br />
                  <z>Published</z>
                </Link>
              </div>
              {user.username === writer.username && (
                <>
                  <div className={`Prof-Nav-item${this.state.archived}`}>
                    <Link to="?tab=archived" onClick={this.handleTabChange}>
                      <i class="material-icons">archive</i>
                      <br />
                      <z>Archived</z>
                    </Link>
                  </div>
                  <div className={`Prof-Nav-item${this.state.saved}`}>
                    <Link to="?tab=saved" onClick={this.handleTabChange}>
                      <i class="material-icons">bookmarks</i>
                      <br />
                      <z>Saved</z>
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
              <a href={routes.VIEW_WRITER(avatar.username)}>
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
              <a href={routes.VIEW_WRITER(avatar.username)}>
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
              <Link to={routes.VIEW_BLOG(blog.pk)}>
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
                  <Link to={routes.VIEW_BLOG(blog.pk)}>
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
                  <Link to={routes.VIEW_BLOG(blog.pk)}>
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
