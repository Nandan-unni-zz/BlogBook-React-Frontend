import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

import './Feed.css';
import Logo from '../../Components/Logo';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { feedTool } from '../../Services/FeatureServices';

function Skltn () {
  return (
    <div className="Sk">
      <Skeleton height={"3.5vh"} width={"20vw"}/><br/>
      <Skeleton height={"2vh"} width={"10vw"}/><br/><br/>
      <Skeleton height={"3vh"} width={"80vw"}/><br/>
      <Skeleton height={"3vh"} width={"80vw"}/><br/>
      <Skeleton height={"3vh"} width={"80vw"}/><br/>
      <Skeleton height={"3vh"} width={"80vw"}/><br/>
      <Skeleton height={"3vh"} width={"80vw"}/><br/><br/>
      <div className="Sk-Nav">
        <div className="Sk-left"><Skeleton height={"5vh"} width={"7.5vh"}/><Skeleton circle={true} height={"5vh"} width={"5vh"}/></div>
        <div className="Sk-right"><Skeleton circle={true} height={"5vh"} width={"5vh"}/></div>
      </div><br/><br/>
    </div>
  );
}

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 91,
      b: 92,
      blogs: [],
      loaded: false,
    }
    this.handleLike = this.handleLike.bind(this);
    this.handleBmark = this.handleBmark.bind(this);
  }
  componentDidMount() {
    feedTool().then(result => {
      this.setState({ blogs: result, loaded: true })
    });
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
          <a href="/account/view/unni"><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
          <a href="/search/"><i class="material-icons">person_add_alt_1</i><br/><z>Search</z></a>
          <a href="/message/"><i class="material-icons">chat</i><br/><z>Message</z></a>
          <a href="/blog/create/"><i class="material-icons">edit</i><br/><z>New Blog</z></a>
        </Navbar>
        <div className="Blogs">
        {this.state.loaded ? this.state.blogs.map(blog => 
            <div className="Blog">
              <div className="Blog-Content">
                <h3>{blog.title}</h3>
                <a href={`/account/view/${blog.author_pname}`}>{blog.author_pname}</a><br /><br />
                <p>{blog.content}</p><br/>
                <div className="Blog-Nav">
                  <z>{blog.no_of_likes}</z>
                  <div className="Blog-Nav-left" id={`${blog.pk}-like`} onClick={() => this.handleLike(blog.pk+'-like')}><button><i class="material-icons">favorite_border</i></button></div>
                  <div className="Blog-Nav-right" id={`${blog.pk}-bmark`} onClick={() => this.handleBmark(blog.pk+'-bmark')}><button><i class="material-icons">bookmark_border</i></button></div>
                </div>
              </div>
            </div>
          ) : <p><Skltn /><Skltn /></p>}
        </div>
        <br/><br/><hr/><Footer></Footer>
      </div>
    );
  }
}

export default Feed;
