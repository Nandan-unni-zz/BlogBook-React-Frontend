import React, { Component } from 'react';

import './Feed.css';
import Logo from '../../Components/Logo';
import Navbar from '../../Components/Navbar';

class Feed extends Component {
  render() {
    return (
      <div className="Feed">
        <Logo></Logo>
        <Navbar>
          <a href="/account/logout/"><i class="material-icons">power_settings_new</i><z> Logout</z></a>
          <a href="/account/view/"><i class="material-icons">account_circle</i><z> Profile</z></a>
          <a href="/search/"><i class="material-icons">person_add_alt_1</i><z> Search</z></a>
          <a href="/message/"><i class="material-icons">chat</i><z> Message</z></a>
          <a href="/blog/create/"><i class="material-icons">edit</i><z> New</z></a>
        </Navbar>
        <div className="Blogs">
          <div className="Blog">
            <div className="Blog-Content">
              <h3>Django: The Python Framework</h3>
              <a href='/account/view/'>Django Software Foundation</a><br /><br />
              <p>
                Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design.
                Built by experienced developers, it takes care of much of the hassle of Web development, 
                so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source. <br/><br/>
                Ridiculously fast.<br/>
                Django was designed to help developers take applications from concept to completion as quickly as possible.<br/><br/>
                Reassuringly secure.<br/>
                Django takes security seriously and helps developers avoid many common security mistakes.<br/><br/>
                Exceedingly scalable.<br/>
                Some of the busiest sites on the Web leverage Django’s ability to quickly and flexibly scale.<br/><br/>
              </p>
              <div className="Blog-Nav">
                <div className="Blog-Nav-left filled"><b>3</b><a href='/blog/like/'><i class="material-icons">favorite</i></a></div>
                <div className="Blog-Nav-right empty"><a href='/blog/bookmark/'><i class="material-icons">bookmark_border</i></a></div>
              </div>
            </div>
          </div>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        The end
      </div>
    );
  }
}

export default Feed;
