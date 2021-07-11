import React, { Component } from "react";

import { Button, Logo, Portal, Navbar } from "../../components";

class NotFound extends Component {
  render() {
    return (
      <div className="Error">
        <Logo />
        <Navbar />
        <br />
        <br />
        <br />
        <Portal>
          <center>
            <h2>404 : URL Not Found</h2>
            <br />
            <p>
              The requested URL <l>{`${window.location.pathname}`}</l> was not
              found on this server. <z>That's all we know.</z>
            </p>
            <br />
            <Button href="/feed/" className="normal">
              Back to Feeds
            </Button>
          </center>
        </Portal>
      </div>
    );
  }
}

export default NotFound;
