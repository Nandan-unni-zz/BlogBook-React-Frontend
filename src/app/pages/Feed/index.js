import "./index.css";

import { Component } from "react";

import { Navbar } from "../../components";

class Feed extends Component {
  render() {
    return (
      <div>
        <Navbar logout />
      </div>
    );
  }
}

export default Feed;
