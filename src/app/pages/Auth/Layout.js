import React, { Component } from "react";
import "./Auth.css";

import { Logo } from "../../components";
import { ideaPen } from "../../../static";

class Layout extends Component {
  render() {
    return (
      <div className="auth">
        <Logo />
        <div className="auth-layout">
          <div className="auth-left">
            <img src={ideaPen} class="auth-img" alt="Idea pen" />
          </div>
          <div className="auth-right">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Layout;
