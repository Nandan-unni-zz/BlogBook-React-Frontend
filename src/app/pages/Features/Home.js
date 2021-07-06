import React, { Component } from "react";
import "./Home.css";

import { Logo, Button } from "../../components";
import { ideaPen } from "../../../static";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Logo />
        <div className="auth-content">
          <img src={ideaPen} align="left" class="auth-img" alt="Idea pen" />
          <br />
          <br />
          <p>
            <br />
            You're at the right place ! Create and publish your ideas as blogs.
            Start blogging in <kb>Key Blogs</kb> by creating account or Log in
            if you already have one.
          </p>
          <br />
          <div className="auth-nav">
            &nbsp;
            <Button href="/writer/create/" class="normal">
              Create Account
            </Button>
            <Button href="/login/" class="normal">
              Log In
            </Button>
            &nbsp;
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
