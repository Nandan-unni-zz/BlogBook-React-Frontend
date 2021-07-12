import React, { Component } from "react";

import "./Search.css";
import { Navbar } from "../../components";
import { Spin, Button } from "antd";

import {
  searchWriterAPI,
  getWritersAPI,
  followWriterAPI,
} from "../../../services/writer";
import { writerImg } from "../../../static";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      results: [],
      username: "",
      loading: true,
      msg: "Start typing to search ...",
      followingUser: -1,
    };
  }

  handleFollow = async (pk) => {
    this.setState({ followingUser: pk });
    const response = await followWriterAPI(this.state.user.pk, pk);
    if (response.status === 200) {
      this.handleSearch(this.state.username);
      this.setState({ followingUser: -1 });
    }
  };

  handleSearch = async (val) => {
    this.setState({ loading: true, msg: "", username: val });
    const response = await searchWriterAPI({ username: this.state.username });
    if (response.status === 200)
      this.setState({
        results: response.data,
        loading: false,
        msg: `${response.data.length} results found`,
      });
    else this.setState({ loading: false, msg: "Error in fetching results" });
  };

  handleSubmit = async () => {};

  componentDidMount() {
    getWritersAPI().then((result) => {
      this.setState({ results: result, loading: false });
    });
  }

  render() {
    return (
      <div className="SearchWrapper">
        <Navbar backBtn feed profile />
        <div className="search">
          <div className="search-input">
            <input onChange={({ target }) => this.handleSearch(target.value)} />
            <span className="material-icons">search</span>
          </div>
          <div className="search-msg">
            {this.state.loading ? <Spin /> : this.state.msg}
          </div>
          <div className="search-output">
            {this.state.results.map(
              (result) =>
                result.username !== this.state.user.username && (
                  <div className="search-card">
                    <div className="search-card-left">
                      <img
                        src={result.dp}
                        onError={({ target }) => (target.src = writerImg)}
                        alt={"test"}
                      />
                      <div className="search-card-dtl">
                        <h4>{result.username}</h4>
                        <p>{result.name}</p>
                      </div>
                    </div>
                    {result.followers.some(
                      (follower) =>
                        follower.username === this.state.user.username
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
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
