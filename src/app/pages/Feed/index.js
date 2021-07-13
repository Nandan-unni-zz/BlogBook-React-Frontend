import "./index.css";

import { Component } from "react";

import { Navbar } from "../../components";
import { localUserStorage } from "../../../utils";

class Feed extends Component {
  state = {
    user: localUserStorage.getUser(),
  };

  render() {
    return (
      <div>
        <Navbar logout />
      </div>
    );
  }
}

export default Feed;
