import React, { Component } from "react";
import { Form } from "antd";

import "./Search.css";
import { Navbar } from "../../components";

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
      loaded: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }
  handleFollow = async (pk) => {
    const response = await followWriterAPI(this.state.user.pk, pk);
    if (response.status === 200)
      getWritersAPI().then((result) => {
        this.setState({ results: result, loaded: true });
      });
  };
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value, errMsg: "" });
    console.log(this.state.username);
  };
  handleSubmit = async () => {
    const response = await searchWriterAPI({ username: this.state.username });
    if (response.status === 200)
      this.setState({ results: response.data, loaded: true });
    else this.setState({ errMsg: "Invalid email or password." });
  };
  componentDidMount() {
    getWritersAPI().then((result) => {
      this.setState({ results: result, loaded: true });
    });
  }
  render() {
    return (
      <div className="Search">
        <Navbar>
          <a href={`/writer/view/${this.state.user.username}`}>
            <i class="material-icons">account_circle</i>
            <br />
            <z>Profile</z>
          </a>
          <a href="/feed/">
            <i class="material-icons">home</i>
            <br />
            <z>Feed</z>
          </a>
        </Navbar>
        <br />
        <br />
        <center>
          <div className="search-bar">
            <Form onFinish={this.handleSubmit}>
              <div className="search-box">
                <div className="search-in">
                  <Form.Item>
                    <input
                      id="username"
                      name="username"
                      type="sear"
                      placeholder="Search with pen name"
                      onChange={this.handleChange}
                    />{" "}
                    &nbsp;
                  </Form.Item>
                </div>
                <div className="search-out">
                  <Form.Item>
                    <button type="submit">
                      <i class="material-icons">search</i>
                    </button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </center>
        <br />
        <div className="search-results">
          {this.state.loaded ? (
            <span>
              <br />{" "}
              {this.state.results.map((result) => (
                <span>
                  <div className="search-result">
                    <div className="result-img">
                      <img src={writerImg} alt="dp" />
                    </div>
                    <div className="result-names">
                      <unm>{result.username}</unm>
                      <br />
                      <nm>{result.name}</nm>
                    </div>
                  </div>
                  <br />
                  <div className="result-divider"></div>
                  <br />
                </span>
              ))}{" "}
            </span>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
