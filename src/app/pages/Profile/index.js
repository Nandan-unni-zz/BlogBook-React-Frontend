import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Row, Tooltip } from "antd";

import Navbar from "../../components/Navbar";
import actions from "../../../store/profile/actions";
import { followOrUnfollow } from "../../../store/common/actions";
import { writerPlaceholder } from "../../../static";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";
import ProfileTab from "./ProfileTab";
import { ProfileSkeleton } from "../../skeletons";
import { userStorage } from "../../../utils";

class Profile extends Component {
  state = {
    user: userStorage.getUser(),
  };
  componentDidMount() {
    this.props.fetchWriter(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId)
      this.props.fetchWriter(this.props.match.params.userId);
  }

  render() {
    const profile = this.props.profile;
    return (
      <div className="profile-wrapper">
        <Navbar
          createBlog
          feed
          settings={profile.isUser}
          profile={!profile.isUser}
          logout
        />
        {profile.loading ? (
          <ProfileSkeleton />
        ) : (
          <div className="profile">
            <div className="profile-data">
              <img
                src={profile?.data?.dp}
                onError={({ target }) => (target.src = writerPlaceholder)}
                alt={`${profile?.data?.username}'s DP`}
              />
              <div className="profile-dtl">
                <Tooltip overlay="Name">
                  <h3 className="profile-name">{profile?.data?.name}</h3>
                </Tooltip>
                <Col>
                  <Tooltip overlay="Username">
                    <p className="profile-uname">{profile?.data?.username}</p>
                  </Tooltip>
                  {profile?.isUser && (
                    <Tooltip overlay="Email">
                      <p className="profile-email">{profile?.data?.email}</p>
                    </Tooltip>
                  )}
                </Col>
                <Row gutter={{ xs: 10, sm: 20, lg: 25 }}>
                  <Col
                    className="profile-math"
                    align="middle"
                    onClick={() => this.props.setTab(3)}
                  >
                    <p className="profile-math-count">
                      {profile?.publishedBlogs?.length || 0}
                    </p>
                    <p className="profile-math-tag">Blogs</p>
                  </Col>
                  <Col
                    className="profile-math"
                    align="middle"
                    onClick={() => this.props.setTab(2)}
                  >
                    <p className="profile-math-count">
                      {profile?.followers?.length || 0}
                    </p>
                    <p className="profile-math-tag">Followers</p>
                  </Col>
                  <Col
                    className="profile-math"
                    align="middle"
                    justify="middle"
                    onClick={() => this.props.setTab(1)}
                  >
                    <p className="profile-math-count">
                      {profile?.following?.length || 0}
                    </p>
                    <p className="profile-math-tag">Following</p>
                  </Col>
                </Row>
                <Tooltip overlay="Bio">
                  <p className="profile-bio">{profile?.data?.bio}</p>
                </Tooltip>
              </div>
              <div className="profile-ctrl">
                {profile.isUser ? (
                  <Link to={routes.SETTINGS}>
                    <Button size="large" type="primary">
                      Settings
                    </Button>
                  </Link>
                ) : profile.followers.some(
                    (follower) => follower?.pk === this.state.user.pk
                  ) ? (
                  <Button
                    loading={
                      profile?.data?.pk === this.props.common.followingPk
                    }
                    size="large"
                    type="ghost"
                    onClick={() =>
                      this.props.followOrUnfollow(
                        profile?.data?.pk,
                        (newData) =>
                          this.props.updateWriter(newData, profile?.data?.pk)
                      )
                    }
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    loading={
                      profile?.data?.pk === this.props.common.followingPk
                    }
                    size="large"
                    type="primary"
                    onClick={() =>
                      this.props.followOrUnfollow(
                        profile?.data?.pk,
                        (newData) => this.props.updateWriter(newData)
                      )
                    }
                  >
                    Follow
                  </Button>
                )}
              </div>
            </div>
            <ProfileTab />
          </div>
        )}
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
  updateWriter: actions.updateWriter,
})(Profile);
