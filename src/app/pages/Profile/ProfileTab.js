import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

import actions from "../../../store/writer/actions";
import { writerPlaceholder } from "../../../static";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";
import { Stud } from "../../components";
import { userStorage } from "../../../utils";

class ProfileTab extends Component {
  state = {
    user: userStorage.getUser(),
  };
  render() {
    const writer = this.props.writer;
    return (
      <div className="profile-nav">
        <menu>
          <nav
            onClick={() => this.props.setTab(1)}
            className={writer.selectedTab === 1 ? `active` : ``}
          >
            <span className="material-icons">people</span>
            <div className="profile-nav-text">
              <p>Following &nbsp; </p>
              <small>({writer.following.length})</small>
            </div>
          </nav>
          <nav
            onClick={() => this.props.setTab(2)}
            className={writer.selectedTab === 2 ? `active` : ``}
          >
            <span className="material-icons">person</span>
            <div className="profile-nav-text">
              <p>Followers &nbsp; </p>
              <small>({writer.followers.length})</small>
            </div>
          </nav>
          <nav
            onClick={() => this.props.setTab(3)}
            className={writer.selectedTab === 3 ? `active` : ``}
          >
            <span className="material-icons">library_books</span>

            <div className="profile-nav-text">
              <p>Published &nbsp; </p>
              <small>({writer.publishedBlogs.length})</small>
            </div>
          </nav>
          {writer.isUser && (
            <>
              <nav
                onClick={() => this.props.setTab(4)}
                className={writer.selectedTab === 4 ? `active` : ``}
              >
                <span className="material-icons">archive</span>
                <div className="profile-nav-text">
                  <p>Archived &nbsp; </p>
                  <small>({writer.archivedBlogs.length})</small>
                </div>
              </nav>
              <nav
                onClick={() => this.props.setTab(5)}
                className={writer.selectedTab === 5 ? `active` : ``}
              >
                <span className="material-icons">bookmarks</span>

                <div className="profile-nav-text">
                  <p>Saved &nbsp; </p>
                  <small>({writer.savedBlogs.length})</small>
                </div>
              </nav>
            </>
          )}
        </menu>
        <div className="profile-content">
          <div className="prof-tab-cards">
            {
              // START: Following Tab
              writer.selectedTab === 1
                ? writer.following.map((avatar) => (
                    <a href={routes.PROFILE(avatar.pk)} key={avatar.pk}>
                      <div className="prof-tab-card">
                        <div className="prof-tab-card-left">
                          <img
                            src={avatar.dp}
                            alt="authorDP"
                            onError={({ target }) =>
                              (target.src = writerPlaceholder)
                            }
                          />
                          <div className="prof-tab-card-content">
                            <h3>{avatar.username}</h3>
                            <time>{avatar.name}</time>
                          </div>
                        </div>
                        {avatar.pk !== this.props.userId &&
                          (writer.followers.some(
                            (follower) => follower.pk === avatar.pk
                          ) ? (
                            <Button type="ghost" size="middle">
                              Unfollow
                            </Button>
                          ) : (
                            <Button type="primary" size="middle">
                              Follow
                            </Button>
                          ))}
                      </div>
                    </a>
                  ))
                : // END: Following Tab

                /* -------------------- */

                //   START: Followers Tab
                writer.selectedTab === 2
                ? writer.followers.map((avatar) => (
                    <div className="prof-tab-card">
                      <a href={routes.PROFILE(avatar.pk)} key={avatar.pk}>
                        <div className="prof-tab-card-left">
                          <img
                            src={avatar.dp}
                            alt="authorDP"
                            onError={({ target }) =>
                              (target.src = writerPlaceholder)
                            }
                          />
                          <div className="prof-tab-card-content">
                            <h3>{avatar.username}</h3>
                            <time>{avatar.name}</time>
                          </div>
                        </div>
                      </a>
                      {avatar.pk !== this.state.user.pk ? (
                        this.state.user.followers.some(
                          (follower) => follower.pk === avatar.pk
                        ) ? (
                          <Button type="ghost" size="middle">
                            Unfollow
                          </Button>
                        ) : (
                          <Button type="primary" size="middle">
                            Follow
                          </Button>
                        )
                      ) : (
                        <Link to={routes.SETTINGS}>
                          <Stud
                            type="Settings"
                            icon="settings"
                            theme="#323232"
                          />
                        </Link>
                      )}
                    </div>
                  ))
                : // END: Followers Tab

                /* -------------------- */

                //   START: Published Blogs Tab
                writer.selectedTab === 3
                ? writer.publishedBlogs.map((blog) => (
                    <div className="prof-tab-card" key={blog.pk}>
                      <Link to={routes.VIEW_BLOG(blog.pk)}>
                        <div className="prof-tab-card-left">
                          <img
                            src={blog.author.dp}
                            onError={({ target }) =>
                              (target.src = writerPlaceholder)
                            }
                            alt="authorDP"
                          />
                          <div className="prof-tab-card-content">
                            <h3>{blog.title}</h3>
                            <time>{"Few days ago"}</time>
                          </div>
                        </div>
                      </Link>
                      <Stud
                        type="Like"
                        icon="favorite"
                        theme="#ff6347"
                        count={blog.no_of_likes}
                        active={blog.likes.some(
                          (like) => like.pk === this.props.userId
                        )}
                      />
                    </div>
                  ))
                : // END: Published Blogs Tab

                /* -------------------- */

                //   START: Archived Blogs Tab
                writer.selectedTab === 4
                ? writer.archivedBlogs.map((blog) => (
                    <div className="prof-tab-card" key={blog.pk}>
                      <Link to={routes.VIEW_BLOG(blog.pk)}>
                        <div className="prof-tab-card-left">
                          <img
                            src={blog.author.dp}
                            onError={({ target }) =>
                              (target.src = writerPlaceholder)
                            }
                            alt="authorDP"
                          />
                          <div className="prof-tab-card-content">
                            <h3>{blog.title}</h3>
                            <time>{"Few days ago"}</time>
                          </div>
                        </div>
                      </Link>
                      <Stud
                        type="Like"
                        icon="favorite"
                        theme="#ff6347"
                        count={blog.no_of_likes}
                        active={blog.likes.some(
                          (like) => like.pk === this.props.userId
                        )}
                      />
                    </div>
                  ))
                : // END: Archived Blogs Tab

                /* -------------------- */

                //   START: Saved Blogs Tab
                writer.selectedTab === 5
                ? writer.savedBlogs.map((blog) => (
                    <div className="prof-tab-card" key={blog.pk}>
                      <Link to={routes.VIEW_BLOG(blog.pk)}>
                        <div className="prof-tab-card-left">
                          <img
                            src={blog.author.dp}
                            onError={({ target }) =>
                              (target.src = writerPlaceholder)
                            }
                            alt="authorDP"
                          />
                          <div className="prof-tab-card-content">
                            <h3>{blog.title}</h3>
                            <time>{"Few days ago"}</time>
                          </div>
                        </div>
                      </Link>
                      <Stud
                        type="Like"
                        icon="favorite"
                        theme="#ff6347"
                        count={blog.no_of_likes}
                        active={blog.likes.some(
                          (like) => like.pk === this.props.userId
                        )}
                      />
                    </div>
                  ))
                : // END: Archived Blogs Tab

                  /* -------------------- */

                  //   Setting default tab to prevent err
                  this.props.setTab(3)
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { writer: state.writer, userId: state.auth.userId };
};

export default connect(mapStateToProps, {
  fetchWriter: actions.fetchWriter,
  setTab: actions.setTab,
})(ProfileTab);
