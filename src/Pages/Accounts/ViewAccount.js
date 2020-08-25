import React, { Component } from 'react';

import './ViewAccount.css';
import Navbar from '../../Components/Navbar';
import Button from '../../Components/Button';
import dp from '../../Images/writer.png';

class ViewAccount extends Component {
  render() {
    return (
      <div className="ViewAccount">
        <Navbar>
          <a href="/account/logout/"><i class="material-icons">power_settings_new</i><z> Logout</z></a>
          <a href="/account/view/"><i class="material-icons">settings</i><z> Settings</z></a>
          <a href="/feed/"><i class="material-icons">home</i><z> Feeds</z></a>
        </Navbar>
        <div className="Profile">
          <div className="Prof-img">
            <center><img src={dp} alt="DP" /></center>
          </div>
          <div className="Prof-dtl">
            <center>
              <nm>Django Software Foundation</nm><br />
              <unm>django </unm>
              &nbsp; <b>|</b> &nbsp; <eml>django@django.com</eml>
              <br /><flw>103 Followers</flw> &nbsp; <b>|</b> &nbsp;
              <flw> 228 Following</flw> &nbsp; <b>|</b> &nbsp;
              <flw> 14 Blogs</flw><br /><br />
              <bio>The fastest framework written in a powerful language</bio><br/>
            </center><br/>
          </div>
          <div className="Prof-ctrl">
            <div className="ctrl-edit"><Button class="normal" href="/account/edit/">Edit Account</Button></div>
            <div className="ctrl-delete"><Button class="danger" href="/account/delete/">Delete Account</Button></div>
          </div>
        </div><br />
        <div className="Prof-divider"></div>
      </div>
    );
  }
}

export default ViewAccount;
