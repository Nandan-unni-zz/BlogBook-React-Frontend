import React, { Component } from "react";
import "./Home.css";

import { Logo, Button, Navbar } from "../../components";
import { ideaPen } from "../../../static";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Logo />
        <Navbar />
        <div className="auth-content">
          <img src={ideaPen} align="left" className="auth-img" alt="Idea pen" />
          <br />
          <br />
          <p>
            <br />
            You're at the right place ! Create and publish your ideas as blogs.
            Start blogging in <strong>Key Blogs</strong> by creating account or
            Log in if you already have one.
          </p>
          <br />
          <div className="auth-nav">
            &nbsp;
            <Button href="/writer/create/" className="normal">
              Create Account
            </Button>
            <Button href="/login/" className="normal">
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
