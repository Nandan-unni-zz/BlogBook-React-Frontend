import React, { Component } from "react";

import { Button, Logo, Portal, Navbar } from "../../components";

class InvalidPage extends Component {
  render() {
    return (
      <div className="InvalidPage">
        <Logo />
        <Navbar />
        <br />
        <br />
        <br />
        <Portal>
          <center>
            <h2>Invalid Link</h2>
            <br />
            <p>
              You have recieved an invalid or expired link. Request for a new
              one to continue
            </p>
            <br />
            <div className="multi-button">
              <Button href="/login/" className="outline">
                Resend Mail
              </Button>
              &nbsp;
              <Button href="/login/" className="normal">
                Login
              </Button>
            </div>
          </center>
        </Portal>
      </div>
    );
  }
}

export default InvalidPage;
