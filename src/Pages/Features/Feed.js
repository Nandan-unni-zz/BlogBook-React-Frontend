import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

import './Feed.css';
import Logo from '../../Components/Logo';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { feedTool, logoutTool } from '../../Services/FeatureServices';
import { blogLiker } from '../../Services/BlogServices';

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
      user: JSON.parse(localStorage.getItem('user')),
      a: 91,
      b: 92,
      blogs: [],
      loaded: false,
    }
    this.handleLike = this.handleLike.bind(this);
    this.handleBmark = this.handleBmark.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    feedTool().then(result => {
      this.setState({ blogs: result, loaded: true })
    });
}
  handleLike = async (pk) => {
    const res = await blogLiker(pk, this.state.user.pk);
    this.setState({ blogs: res.data })
  }
  handleBmark = (id, pk) => {
    const liked = `<button><i class="material-icons">bookmark</i></button>`;
    const like = `<button><i class="material-icons">bookmark_border</i></button>`;
    const code = document.getElementById(id).innerHTML
    if (code === liked)
      document.getElementById(id).innerHTML = like;
    else
      document.getElementById(id).innerHTML = liked;
  }
  handleLogout = () => {
    logoutTool(this.state.user.pk)
    localStorage.removeItem('user')
  }
  render() {
    const user = this.state.user
    return (
      <div className="Feed">
        <Logo></Logo>
        <Navbar>
          <a href="/logout/" onClick={this.handleLogout}><i class="material-icons">power_settings_new</i><br/><z>Logout</z></a>
          <a href={`/account/view/${user.username}`}><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
          <a href="/search/"><i class="material-icons">person_add_alt_1</i><br/><z>Search</z></a>
          <a href="/message/"><i class="material-icons">chat</i><br/><z>Message</z></a>
          <a href="/blog/create/"><i class="material-icons">create</i><br/><z>New Blog</z></a>
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
                  { blog.likes.some(like => like.username === user.username ) ?
                  <div className="Blog-Nav-left" onClick={() => this.handleLike(blog.pk)}><button><i class="material-icons">favorite</i></button></div> :
                  <div className="Blog-Nav-left" onClick={() => this.handleLike(blog.pk)}><button><i class="material-icons">favorite_border</i></button></div>
                  }
                  <div className="Blog-Nav-right" id={`${blog.pk}-bmark`} onClick={() => this.handleBmark(blog.pk+'-bmark', blog.pk)}><button><i class="material-icons">bookmark_border</i></button></div>
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
