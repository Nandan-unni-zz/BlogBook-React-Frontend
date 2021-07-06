import React, { Component } from "react";
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
        <Navbar>
          <Link to={routes.LOGOUT} onClick={this.handleLogout}>
            <i class="material-icons">power_settings_new</i>
            <br />
            <z>Logout</z>
          </Link>
          <Link to={routes.VIEW_WRITER(this.state.user.username)}>
            <i class="material-icons">settings</i>
            <br />
            <z> Settings</z>
          </Link>
          <Link to={routes.FEED}>
            <i class="material-icons">home</i>
            <br />
            <z> Feeds</z>
          </Link>
        </Navbar>
        {this.state.loaded ? (
          <span>
            <div className="Profile">
              <div className="Prof-img">
                {
                  <center>
                    <img src={writerImg} alt="DP" />
                  </center>
                }
              </div>
              <div className="Prof-dtl">
                <center>
                  <nm>{writer.name}</nm>
                  <br />
                  <unm>{writer.username} </unm>
                  {user.username === writer.username ? (
                    <span>
                      &nbsp; <b>|</b> &nbsp; <eml>{writer.email}</eml>
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

                  <bio>{writer.bio}</bio>
                  <br />
                </center>
                <br />
              </div>
              {user.username === writer.username ? (
                <div className="Prof-ctrl">
                  <div className="ctrl-edit">
                    <Button
                      class="normal"
                      href={`/writer/edit/${writer.username}`}
                    >
                      Edit Account
                    </Button>
                  </div>
                  <div className="ctrl-delete">
                    <Button
                      class="danger"
                      href={`/writer/delete/${writer.username}`}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="Prof-ctrl">
                  <div className="ctrl-edit">
                    {writer.followers.some(
                      (follower) =>
                        follower.username === this.state.user.username
                    ) ? (
                      <Button class="outline" onClick={this.handleFollow}>
                        Unfollow
                      </Button>
                    ) : (
                      <Button class="normal" onClick={this.handleFollow}>
                        Follow
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <br />
            <div className="Prof-divider"></div>
            <div
              className={
                user.username === writer.username
                  ? `Prof-Nav`
                  : `Prof-Nav nav-three`
              }
            >
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
                <span style={{ display: "flex" }}>
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
                </span>
              )}
            </div>
          </span>
        ) : (
          <Skltn />
        )}
        <br />

        {this.state.tab === "following" && (
          <div className="wrt-dtl">
            <div className="dtl">
              {writer.following.map((avatar) => (
                <Link to={routes.VIEW_WRITER(avatar.username)}>
                  <div className="wrt-content">
                    <div className="search-result">
                      <div className="result-img">
                        <img src={writerImg} alt="dp" />
                      </div>
                      <div className="result-names">
                        <unm>{avatar.username}</unm>
                        <br />
                        <nm>{avatar.name}</nm>
                      </div>
                    </div>
                    <br />
                    <div className="result-divider"></div>
                    <br />
                  </div>
                </Link>
              ))}
              <br />
              <br />
            </div>
          </div>
        )}

        {this.state.tab === "followers" && (
          <div className="wrt-dtl">
            <div className="dtl">
              {writer.followers.map((avatar) => (
                <Link to={routes.VIEW_WRITER(avatar.username)}>
                  <div className="wrt-content">
                    <div className="search-result">
                      <div className="result-img">
                        <img src={writerImg} alt="dp" />
                      </div>
                      <div className="result-names">
                        <unm>{avatar.username}</unm>
                        <br />
                        <nm>{avatar.name}</nm>
                      </div>
                    </div>
                    <br />
                    <div className="result-divider"></div>
                    <br />
                  </div>
                </Link>
              ))}
              <br />
              <br />
            </div>
          </div>
        )}

        {this.state.tab === "published" && (
          <div className="item-dtl">
            <div className="dtl">
              {writer.pub_blogs.map((blog) => (
                <Link to={routes.VIEW_BLOG(blog.pk)}>
                  <div className="dtl-content">
                    <br />
                    <ttl>{blog.title}</ttl>
                    <br />
                    <br />
                    <div className="content-nav">
                      <z>{blog.no_of_likes}</z>
                      {blog.likes.some(
                        (like) => like.username === user.username
                      ) ? (
                        <button>
                          <i class="material-icons">favorite</i>
                        </button>
                      ) : (
                        <button>
                          <iu class="material-icons">favorite_border</iu>
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
              <br />
              <br />
            </div>
          </div>
        )}

        {user.username === writer.username && (
          <div>
            {this.state.tab === "archived" && (
              <div className="item-dtl">
                <div className="dtl">
                  {writer.arch_blogs.map((blog) => (
                    <Link to={routes.VIEW_BLOG(blog.pk)}>
                      <div className="dtl-content">
                        <br />
                        <ttl>{blog.title}</ttl>
                        <br />
                        <br />
                        <div className="content-nav">
                          <z>{blog.no_of_likes}</z>
                          {blog.likes.some(
                            (like) => like.username === user.username
                          ) ? (
                            <button>
                              <i class="material-icons">favorite</i>
                            </button>
                          ) : (
                            <button>
                              <iu class="material-icons">favorite_border</iu>
                            </button>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <br />
                  <br />
                </div>
              </div>
            )}

            {this.state.tab === "saved" && (
              <div className="item-dtl">
                <div className="dtl">
                  {writer.saved_blogs.map((blog) => (
                    <Link to={routes.VIEW_BLOG(blog.pk)}>
                      <div className="dtl-content">
                        <br />
                        <ttl>{blog.title}</ttl>
                        <br />
                        <ath>{blog.author.username}</ath>
                        <br />
                        <br />
                        <div className="content-nav">
                          <z>{blog.no_of_likes}</z>
                          {blog.likes.some(
                            (like) => like.username === user.username
                          ) ? (
                            <button>
                              <i class="material-icons">favorite</i>
                            </button>
                          ) : (
                            <button>
                              <iu class="material-icons">favorite_border</iu>
                            </button>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <br />
                  <br />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ViewAccount;
