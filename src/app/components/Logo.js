import React, { Component } from "react";

import "./Logo.css";
import { favicon } from "../../static";

class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <div className="logo-text">
          <img src={favicon} alt="Logo" style={{ height: "3vh" }} /> &nbsp;
          <strong>BlogBook</strong>
        </div>
      </div>
    );
  }
}

export default Logo;
