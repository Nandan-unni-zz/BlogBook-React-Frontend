import React, { Component } from 'react';

import './Error.css';
import Logo from './Logo';
import Portal from './Portal';
import Button from './Button';

class NotFound extends Component {
  render() {
    return (
      <div className="Error">
        <Logo></Logo><br/><br/><br/>
        <Portal>
          <center><h2>404 : URL Not Found</h2><br />
          <p>The requested URL <l>{`${window.location.pathname}`}</l> was not found on this server. <z>That's all we know.</z></p>
          <br/><Button href="/feed/" class="normal">Back to Feeds</Button></center>
        </Portal>
      </div>
    );
  }
}

export default NotFound;
