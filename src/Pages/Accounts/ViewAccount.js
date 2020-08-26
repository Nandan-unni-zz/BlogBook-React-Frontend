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
          <a href="/account/logout/"><i class="material-icons">power_settings_new</i><br/><z> Logout</z></a>
          <a href="/account/view/"><i class="material-icons">settings</i><br/><z> Settings</z></a>
          <a href="/feed/"><i class="material-icons">home</i><br/><z> Feeds</z></a>
        </Navbar>
        <div className="Profile">
          <div className="Prof-img">
            <center><img src={dp} alt="DP" /></center>
          </div>
          <div className="Prof-dtl">
            <center>
              <nm>Django Software Foundation</nm><br />
              <unm>django </unm>
              &nbsp; <b>|</b> &nbsp; <eml>django@djangoproject.com</eml>

              <div className="Prof-math">
                <a href="?tab=published"><div className="math-dtl"><n>20</n><br/><t>Blogs</t></div></a>
                <a href="?tab=following"><div className="math-dtl"><n>100</n><br/><t>Following</t></div></a>
                <a href="?tab=followers"><div className="math-dtl"><n>200</n><br/><t>Followers</t></div></a>
              </div>

              <bio>The fastest framework written in a powerful language</bio><br/>
            </center><br/>
          </div>
          <div className="Prof-ctrl">
            <div className="ctrl-edit"><Button class="normal" href="/account/edit/">Edit Account</Button></div>
            <div className="ctrl-delete"><Button class="danger" href="/account/delete/">Delete Account</Button></div>
          </div>
        </div><br />
        <div className="Prof-divider"></div>
          <div className="Prof-Nav">
            <div className="Prof-Nav-item"><a href="?tab=following"><i class="material-icons">person</i><br/><z>Following</z></a></div>
            <div className="Prof-Nav-item"><a href="?tab=followers"><i class="material-icons">people</i><br/><z>Followers</z></a></div>
            <div className="Prof-Nav-item"><a href="?tab=published"><i class="material-icons">library_books</i><br/><z>Published</z></a></div>
            <div className="Prof-Nav-item"><a href="?tab=saved"><i class="material-icons">archive</i><br/><z>Saved</z></a></div>
            <div className="Prof-Nav-item"><a href="?tab=bookmarked"><i class="material-icons">bookmark</i><br/><z>Bookmarked</z></a></div>
          </div>
      </div>
    );
  }
}

export default ViewAccount;
