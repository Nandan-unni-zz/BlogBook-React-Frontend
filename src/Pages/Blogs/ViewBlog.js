import React, { Component } from 'react';

import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';

class ViewBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
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
        <Navbar>
          <a href={`/account/view/${this.state.user.username}`}><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
          <a href="/feed/"><i class="material-icons">home</i><br/><z>Feed</z></a>
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
              <div className="Prof-ctrl">
                <div className="Blog-Nav-left"><Button class="normal" href="/blog/edit/">Edit Blog</Button></div>
                <div className="Blog-Nav-right"><Button class="danger" href="/blog/delete/">Delete Blog</Button></div>
              </div>
            </div>
          </div>
        </div>
        <br/><br/><hr/>
      </div>
    );
  }
}

export default ViewBlog;
