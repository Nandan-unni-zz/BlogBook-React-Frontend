import React, { Component } from "react";

import { Button, Logo, Portal } from "../../components";

class SuccessPage extends Component {
  render() {
    return (
      <div className="SuccessPage">
        <Logo />
        <br />
        <br />
        <br />
        <Portal>
          <center>
            <h2>Account Created</h2>
            <br />
            <p>
              Please verify your mail id by clicking on the link we've send.
            </p>
            <br />
            <div className="multi-button">
              <Button
                href="https://mail.google.com/mail/u/0/#inbox"
                class="normal"
              >
                Gmail
              </Button>{" "}
              &nbsp;
              <Button href="/login/" class="outline">
                Resend Mail
              </Button>{" "}
              &nbsp;
              <Button href="/login/" class="normal">
                Login
              </Button>
            </div>
          </center>
        </Portal>
      </div>
    );
  }
}

export default SuccessPage;
