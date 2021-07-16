import "./index.css";

import { Component } from "react";
import { Spin, Button } from "antd";
import { Link } from "react-router-dom";

import { Navbar } from "../../components";

import { writerPlaceholder } from "../../../static";
import { userStorage } from "../../../utils";
import { routes } from "../../router/routes";
import {
  followWriterService,
  getWritersService,
  searchWriterService,
} from "../../../services/api/writer.api";

class Search extends Component {
  state = {
    user: userStorage.getUser(),
    results: [],
    username: "",
    loading: true,
    msg: "Start typing to search ...",
    followingUser: -1,
  };

  handleFollow = async (pk) => {
    this.setState({ followingUser: pk });
    const response = await followWriterService(this.state.user.pk, pk);
    if (response.status === 200) {
      this.handleSearch(this.state.username);
      this.setState({ followingUser: -1 });
    }
  };

  handleSearch = async (val) => {
    this.setState({ loading: true, msg: "", username: val });
    const response = await searchWriterService({
      username: this.state.username,
    });
    if (response.status === 200)
      this.setState({
        results: response.data,
        loading: false,
        msg: `${response.data.length} results found`,
      });
    else this.setState({ loading: false, msg: "Error in fetching results" });
  };

  componentDidMount() {
    getWritersService().then((result) => {
      this.setState({ results: result.data, loading: false });
    });
  }

  render() {
    return (
      <div className="SearchWrapper">
        <Navbar backBtn feed profile />
        <div className="search">
          <div className="search-input">
            <input
              onChange={({ target }) => this.handleSearch(target.value)}
              placeholder="Start typing to search ..."
            />
            <span className="material-icons">search</span>
          </div>
          <div className="search-msg">
            {this.state.loading ? <Spin /> : this.state.msg}
          </div>
          <div className="search-output">
            {this.state.results.map((result) => (
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

                {result.username !== this.state.user.username &&
                  (result.followers.some(
                    (follower) => follower.username === this.state.user.username
                  ) ? (
                    <Button
                      type="ghost"
                      size="middle"
                      onClick={() => this.handleFollow(result.pk)}
                      loading={this.state.followingUser === result.pk}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="middle"
                      onClick={() => this.handleFollow(result.pk)}
                      loading={this.state.followingUser === result.pk}
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

export default Search;
