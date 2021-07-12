import "./index.css";

import { Component } from "react";
import { icon } from "../../../static";

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <img src={icon} alt="icon" />
        <strong>BlogBook</strong>
      </div>
    );
  }
}

export default Banner;
