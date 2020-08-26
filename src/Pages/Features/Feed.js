import React, { Component } from 'react';

import './Feed.css';
import Logo from '../../Components/Logo';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 1,
      b: 2,
    }
    this.handleLike = this.handleLike.bind(this);
    this.handleBmark = this.handleBmark.bind(this);
  }
  handleLike = (x) => {
    const liked = `<button><i class="material-icons">favorite</i></button>`;
    const like = `<button><i class="material-icons">favorite_border</i></button>`;
    const code = document.getElementById(x).innerHTML
    if (code === liked)
      document.getElementById(x).innerHTML = like;
    else
      document.getElementById(x).innerHTML = liked;
  }
  handleBmark = (x) => {
    const liked = `<button><i class="material-icons">bookmark</i></button>`;
    const like = `<button><i class="material-icons">bookmark_border</i></button>`;
    const code = document.getElementById(x).innerHTML
    if (code === liked)
      document.getElementById(x).innerHTML = like;
    else
      document.getElementById(x).innerHTML = liked;
  }
  render() {
    return (
      <div className="Feed">
        <Logo></Logo>
        <Navbar>
          <a href="/account/logout/"><i class="material-icons">power_settings_new</i><br/><z>Logout</z></a>
          <a href="/account/view/"><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
          <a href="/search/"><i class="material-icons">person_add_alt_1</i><br/><z> Search</z></a>
          <a href="/message/"><i class="material-icons">chat</i><br/><z> Message</z></a>
          <a href="/blog/create/"><i class="material-icons">edit</i><br/><z>New Blog</z></a>
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
                <z>3</z><div className="Blog-Nav-left" id={`${this.state.a}-like`} onClick={() => this.handleLike(this.state.a+'-like')}><button><i class="material-icons">favorite_border</i></button></div>
                <div className="Blog-Nav-right" id={`${this.state.a}-bmark`} onClick={() => this.handleBmark(this.state.a+'-bmark')}><button><i class="material-icons">bookmark_border</i></button></div>
              </div>
            </div>
          </div>

          <div className="Blog">
            <div className="Blog-Content">
              <h3>Express: The JavaScript Framework</h3>
              <a href='/account/view/'>Express Software Foundation</a><br /><br />
              <p>
                Express is a minimal and flexible Node.js web application framework that provides a 
                robust set of features for web and mobile applications.It facilitates the rapid 
                development of Node based Web applications.<br/><br/>
                APIs<br/>
                With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.<br/><br/>
                Performance<br/>
                Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.<br/><br/>
                Frameworks<br/>
                Many popular frameworks are based on Express.<br/>
              </p>
              <div className="Blog-Nav">
                <z>3</z><div className="Blog-Nav-left" id={`${this.state.b}-like`} onClick={() => this.handleLike(this.state.b+'-like')}><button><i class="material-icons">favorite_border</i></button></div>
                <div className="Blog-Nav-right" id={`${this.state.b}-bmark`} onClick={() => this.handleBmark(this.state.b+'-bmark')}><button><i class="material-icons">bookmark_border</i></button></div>
              </div>
            </div>
          </div>

        </div>
        <br/><br/><hr/><Footer></Footer>
      </div>
    );
  }
}

export default Feed;
