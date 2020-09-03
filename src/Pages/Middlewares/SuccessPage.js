import React, { Component } from 'react';

import Logo from '../../Components/Logo';
import Portal from '../../Components/Portal';
import Button from '../../Components/Button';

class SuccessPage extends Component {
  render() {
    return (
      <div className="SuccessPage">
        <Logo></Logo><br/><br/><br/>
        <Portal>
          <center><h2>Account Created</h2><br />
          <p>Please verify your mail id by clicking on the link we've send.</p>
          <br/>
          <div className="multi-button">
            <Button href="https://mail.google.com/mail/u/0/#inbox" class="normal">Gmail</Button> &nbsp;
            <Button href="/account/login/" class="outline">Resend Mail</Button> &nbsp;
            <Button href="/account/login/" class="normal">Login</Button>
          </div></center>
        </Portal>
      </div>
    );
  }
}

export default SuccessPage;
