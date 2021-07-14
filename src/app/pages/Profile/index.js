import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Row, Tooltip } from "antd";

import Navbar from "../../components/Navbar";
import actions from "../../../store/writer/actions";
import { writerPlaceholder } from "../../../static";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";
import ProfileTab from "./ProfileTab";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchWriter(this.props.match.params.userId);
  }

  render() {
    const writer = this.props.writer;
    return (
      <div className="profile-wrapper">
        <Navbar createBlog feed settings={writer.isUser} logout />
        <div className="profile">
          <div className="profile-data">
            <img
              src={writer?.profile?.dp}
              onError={({ target }) => (target.src = writerPlaceholder)}
              alt={`${writer?.profile?.username}'s DP`}
            />
            <div className="profile-dtl">
              <Tooltip overlay="Name">
                <h3 className="profile-name">{writer?.profile?.name}</h3>
              </Tooltip>
              <Col>
                <Tooltip overlay="Username">
                  <p className="profile-uname">{writer?.profile?.username}</p>
                </Tooltip>
                {writer?.isUser && (
                  <Tooltip overlay="Email">
                    <p className="profile-email">{writer?.profile?.email}</p>
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
                    {writer?.publishedBlogs?.length || 0}
                  </p>
                  <p className="profile-math-tag">Blogs</p>
                </Col>
                <Col
                  className="profile-math"
                  align="middle"
                  onClick={() => this.props.setTab(2)}
                >
                  <p className="profile-math-count">
                    {writer?.followers?.length || 0}
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
                    {writer?.following?.length || 0}
                  </p>
                  <p className="profile-math-tag">Following</p>
                </Col>
              </Row>
              <Tooltip overlay="Bio">
                <p className="profile-bio">{writer?.profile?.bio}</p>
              </Tooltip>
            </div>
            <div className="profile-ctrl">
              {writer.isUser ? (
                <Link to={routes.SETTINGS}>
                  <Button size="large" type="primary">
                    Settings
                  </Button>
                </Link>
              ) : writer.isFollowing ? (
                <Button size="large" type="ghost">
                  Unfollow
                </Button>
              ) : (
                <Button size="large" type="primary">
                  Follow
                </Button>
              )}
            </div>
          </div>
          <ProfileTab />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { writer: state.writer };
};

export default connect(mapStateToProps, {
  fetchWriter: actions.fetchWriter,
  setTab: actions.setTab,
})(Profile);
