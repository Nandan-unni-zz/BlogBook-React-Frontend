import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

import actions from "../../../store/profile/actions";
import { writerPlaceholder } from "../../../static";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";
import { Stud } from "../../components";
import { userStorage } from "../../../utils";
import { followOrUnfollow } from "../../../store/common/actions";

class ProfileTab extends Component {
  state = {
    user: userStorage.getUser(),
  };
  render() {
    const profile = this.props.profile;
    return (
      <div className="profile-nav">
        <menu>
          <nav
            onClick={() => this.props.setTab(1)}
            className={profile.selectedTab === 1 ? `active` : ``}
          >
            <span className="material-icons">people</span>
            <div className="profile-nav-text">
              <p>Following &nbsp; </p>
              <small>({profile.following.length})</small>
            </div>
          </nav>
          <nav
            onClick={() => this.props.setTab(2)}
            className={profile.selectedTab === 2 ? `active` : ``}
          >
            <span className="material-icons">person</span>
            <div className="profile-nav-text">
              <p>Followers &nbsp; </p>
              <small>({profile.followers.length})</small>
            </div>
          </nav>
          <nav
            onClick={() => this.props.setTab(3)}
            className={profile.selectedTab === 3 ? `active` : ``}
          >
            <span className="material-icons">library_books</span>

            <div className="profile-nav-text">
              <p>Published &nbsp; </p>
              <small>({profile.publishedBlogs.length})</small>
            </div>
          </nav>
          {profile.isUser && (
            <>
              <nav
                onClick={() => this.props.setTab(4)}
                className={profile.selectedTab === 4 ? `active` : ``}
              >
                <span className="material-icons">archive</span>
                <div className="profile-nav-text">
                  <p>Archived &nbsp; </p>
                  <small>({profile.archivedBlogs.length})</small>
                </div>
              </nav>
              <nav
                onClick={() => this.props.setTab(5)}
                className={profile.selectedTab === 5 ? `active` : ``}
              >
                <span className="material-icons">bookmarks</span>

                <div className="profile-nav-text">
                  <p>Saved &nbsp; </p>
                  <small>({profile.savedBlogs.length})</small>
                </div>
              </nav>
            </>
          )}
        </menu>
        <div className="profile-content">
          <div className="prof-tab-cards">
            {
              // START: Following Tab
              profile.selectedTab === 1
                ? profile.following.map((avatar) => (
                    <div className="prof-tab-card" key={avatar.pk}>
                      <Link to={routes.PROFILE(avatar.pk)}>
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
                      </Link>
                      {avatar.pk !== this.state.user.pk ? (
                        <Button
                          loading={avatar.pk === this.props.common.followingPk}
                          onClick={() =>
                            this.props.followOrUnfollow(avatar.pk, (newData) =>
                              this.props.postFollowUserUpdate(newData)
                            )
                          }
                          type={
                            avatar.followers.some(
                              (following) => following.pk === this.state.user.pk
                            )
                              ? "ghost"
                              : "primary"
                          }
                          size="middle"
                        >
                          {avatar.followers.some(
                            (following) => following.pk === this.state.user.pk
                          )
                            ? "Unfollow"
                            : "Follow"}
                        </Button>
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
                : // END: Following Tab

                /* -------------------- */

                //   START: Followers Tab
                profile.selectedTab === 2
                ? profile.followers.map((avatar) => (
                    <div className="prof-tab-card" key={avatar.pk}>
                      <Link to={routes.PROFILE(avatar.pk)}>
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
                      </Link>
                      {avatar.pk !== this.state.user.pk ? (
                        <Button
                          loading={avatar.pk === this.props.common.followingPk}
                          onClick={() =>
                            this.props.followOrUnfollow(avatar.pk, (newData) =>
                              this.props.postFollowUserUpdate(newData)
                            )
                          }
                          type={
                            avatar.followers.some(
                              (following) => following.pk === this.state.user.pk
                            )
                              ? "ghost"
                              : "primary"
                          }
                          size="middle"
                        >
                          {avatar.followers.some(
                            (following) => following.pk === this.state.user.pk
                          )
                            ? "Unfollow"
                            : "Follow"}
                        </Button>
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
                profile.selectedTab === 3
                ? profile.publishedBlogs.map((blog) => (
                    <Link to={routes.READ_BLOG(blog.pk)} key={blog.pk}>
                      <div className="prof-tab-card">
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
                        <Stud
                          type="Like"
                          icon="favorite"
                          theme="#ff6347"
                          count={blog.noOfLikes}
                          active={blog.isLiked}
                        />
                      </div>
                    </Link>
                  ))
                : // END: Published Blogs Tab

                /* -------------------- */

                //   START: Archived Blogs Tab
                profile.selectedTab === 4
                ? profile.archivedBlogs.map((blog) => (
                    <Link to={routes.READ_BLOG(blog.pk)} key={blog.pk}>
                      <div className="prof-tab-card">
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
                        <Stud
                          type="Like"
                          icon="favorite"
                          theme="#ff6347"
                          count={blog.noOfLikes}
                          active={blog.isLiked}
                        />
                      </div>
                    </Link>
                  ))
                : // END: Archived Blogs Tab

                /* -------------------- */

                //   START: Saved Blogs Tab
                profile.selectedTab === 5
                ? profile.savedBlogs.map((blog) => (
                    <Link to={routes.READ_BLOG(blog.pk)} key={blog.pk}>
                      <div className="prof-tab-card">
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
                        <Stud
                          type="Like"
                          icon="favorite"
                          theme="#ff6347"
                          count={blog.noOfLikes}
                          active={blog.isLiked}
                        />
                      </div>
                    </Link>
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
  return { profile: state.profile, common: state.common };
};

export default connect(mapStateToProps, {
  fetchWriter: actions.fetchWriter,
  setTab: actions.setTab,
  followOrUnfollow,
  postFollowUserUpdate: actions.postFollowUserUpdate,
})(ProfileTab);
