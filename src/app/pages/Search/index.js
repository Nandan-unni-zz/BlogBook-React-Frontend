import "./index.css";

import { Component } from "react";
import { Spin, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Navbar } from "../../components";

import { writerPlaceholder } from "../../../static";
import { userStorage } from "../../../utils";
import { routes } from "../../router/routes";
import {
  getInitialData,
  searchQuery,
  postFollowResultUpdate,
} from "../../../store/search/actions";
import { followOrUnfollow } from "../../../store/common/actions";

class Search extends Component {
  state = {
    user: userStorage.getUser(),
  };

  componentDidMount() {
    this.props.getInitialData();
  }

  render() {
    return (
      <div className="SearchWrapper">
        <Navbar backBtn feed profile />
        <div className="search">
          <div className="search-input">
            <input
              onChange={({ target }) => this.props.searchQuery(target.value)}
              placeholder="Start typing to search ..."
            />
            <span className="material-icons">search</span>
          </div>
          <div className="search-msg">
            {this.props.search.loading ? <Spin /> : this.props.search.msg}
          </div>
          <div className="search-output">
            {this.props.search.results.map((result) => (
              <div className="search-card">
                <Link to={routes.PROFILE(result.pk)} key={result.pk}>
                  <div className="search-card-left">
                    <img
                      src={result.dp}
                      onError={({ target }) => (target.src = writerPlaceholder)}
                      alt={result.username}
                    />
                    <div className="search-card-dtl">
                      <h4>{result.username}</h4>
                      <p>{result.name}</p>
                    </div>
                  </div>
                </Link>

                {result.pk !== this.state.user.pk &&
                  (result.followers.some(
                    (follower) => follower.username === this.state.user.username
                  ) ? (
                    <Button
                      type="ghost"
                      size="middle"
                      onClick={() =>
                        this.props.followOrUnfollow(result.pk, (data) =>
                          this.props.postFollowResultUpdate(data)
                        )
                      }
                      loading={this.props.followingPk === result.pk}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="middle"
                      onClick={() =>
                        this.props.followOrUnfollow(result.pk, (data) =>
                          this.props.postFollowResultUpdate(data)
                        )
                      }
                      loading={this.props.followingPk === result.pk}
                    >
                      Follow
                    </Button>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { search: state.search, followingPk: state.common.followingPk };
};

export default connect(mapStateToProps, {
  searchQuery,
  getInitialData,
  followOrUnfollow,
  postFollowResultUpdate,
})(Search);
