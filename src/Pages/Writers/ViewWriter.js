import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

import './Writers.css';
import Navbar from '../../Components/Navbar';
import Button from '../../Components/Button';
import defaultdp from '../../Images/writer.png';

import { logoutWriterAPI, getWriterAPI } from '../../Services/WriterServices';

function Skltn () {
  return (
    <div className="Profile">
        <center><Skeleton  circle={true} height={"22.5vh"} width={"22.5vh"}/></center>
      <div className="Prof-dtl">
        <center>
          <nm><Skeleton width={"20vw"} /> </nm><br />
          <unm><Skeleton width={"5vw"} /> </unm>
          &nbsp; <b>|</b> &nbsp; <eml><Skeleton width={"6vw"} /></eml>

          <div className="Prof-math">
            <a href="?tab=published"><div className="math-dtl"><n><Skeleton width={"3vw"} /></n><br/><t>Blogs</t></div></a>
            <a href="?tab=following"><div className="math-dtl"><n><Skeleton width={"3vw"} /></n><br/><t>Following</t></div></a>
            <a href="?tab=followers"><div className="math-dtl"><n><Skeleton width={"3vw"} /></n><br/><t>Followers</t></div></a>
          </div>

          <bio><Skeleton width={"30vw"} /></bio><br/>
        </center><br/>
      </div>
      <div className="Prof-ctrl">
        <div className="ctrl-edit"><Skeleton height={"5vh"} width={"15vh"}/></div>
        <div className="ctrl-delete"><Skeleton height={"5vh"} width={"15vh"}/></div>
      </div>
    </div>
  );
}

class ViewAccount extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      writer: {},
      loaded: false,
      tab: "",
      following: "",
      followers: "",
      published: "",
      archived: "",
      saved: "",
    }
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = () => {
    logoutWriterAPI(this.state.user.pk)
    localStorage.removeItem('user')
  }
  componentDidMount() {
    getWriterAPI(this.props.match.params.username).then(res => {
      const tab = new URLSearchParams(this.props.location.search).get('tab');
      this.setState({ writer: res, loaded: true, [tab]: " item-active", tab: tab });
      if (['following', 'followers', 'archived', 'saved'].indexOf(this.state.tab) < 0 )
        this.setState({published: " item-active", tab: "published" });
      else
        this.setState({published: ""});
      if (!(this.state.writer.username === this.state.user.username))
      {
        if (['archived', 'saved'].indexOf(this.state.tab) > 0 )
        {
          this.setState({published: " item-active", tab: "published" });
          console.log(this.state.published)
        }
      }
    });
  }
  render() {
    const writer = this.state.writer;
    const user = this.state.user;
    return (
      <div className="ViewAccount">
        <Navbar>
          <a href="/logout/" onClick={this.handleLogout}><i class="material-icons">power_settings_new</i><br/><z>Logout</z></a>
          <a href={`/writer/view/${this.state.user.username}`}><i class="material-icons">settings</i><br/><z> Settings</z></a>
          <a href="/feed/"><i class="material-icons">home</i><br/><z> Feeds</z></a>
        </Navbar>
        { this.state.loaded ? <div className="Profile">
          <div className="Prof-img">
            {<center><img src={defaultdp} alt="DP" /></center>}
          </div>
          <div className="Prof-dtl">
            <center>
              <nm>{writer.name}</nm><br />
              <unm>{writer.username} </unm>
              { user.username === writer.username ? <z>
              &nbsp; <b>|</b> &nbsp; <eml>{writer.email}</eml>
              </z> : <z></z> }

              <div className="Prof-math">
                <a href="?tab=published"><div className="math-dtl"><n>{writer.no_of_blogs}</n><br/><t>Blogs</t></div></a>
                <a href="?tab=following"><div className="math-dtl"><n>{writer.no_of_following}</n><br/><t>Following</t></div></a>
                <a href="?tab=followers"><div className="math-dtl"><n>{writer.no_of_followers}</n><br/><t>Followers</t></div></a>
              </div>

              <bio>{writer.bio}</bio><br/>
            </center><br/>
          </div>
          { user.username === writer.username ? 
            <div className="Prof-ctrl">
              <div className="ctrl-edit"><Button class="normal" href={`/writer/edit/${writer.username}`}>Edit Account</Button></div>
              <div className="ctrl-delete"><Button class="danger" href={`/writer/delete/${writer.username}`}>Delete Account</Button></div>
            </div> : 
            <div className="Prof-ctrl">
              { writer.followers.some(follower => (follower.username !== user.username) ) ?
              <div className="ctrl-edit"><Button class="normal">Follow</Button></div> :
              <div className="ctrl-edit"><Button class="outline">Unfollow</Button></div>
              }
            </div> }
        </div> : <Skltn />}<br />
        <div className="Prof-divider"></div>
          <div className={user.username === writer.username ? `Prof-Nav` : `Prof-Nav nav-three`}>
            <div className={`Prof-Nav-item${this.state.following}`}><a href="?tab=following"><i class="material-icons">person</i><br/><z>Following</z></a></div>
            <div className={`Prof-Nav-item${this.state.followers}`}><a href="?tab=followers"><i class="material-icons">people</i><br/><z>Followers</z></a></div>
            <div className={`Prof-Nav-item${this.state.published}`}><a href="?tab=published"><i class="material-icons">library_books</i><br/><z>Published</z></a></div>
            { user.username === writer.username ? <z>
            <div className={`Prof-Nav-item${this.state.archived}`}><a href="?tab=archived"><i class="material-icons">archive</i><br/><z>Archived</z></a></div>
            <div className={`Prof-Nav-item${this.state.saved}`}><a href="?tab=saved"><i class="material-icons">bookmarks</i><br/><z>Saved</z></a></div>
            </z> : <z></z> }
          </div>

          { this.state.tab === 'following' ? 
            <div className="wrt-dtl">
              <div className="dtl">
                { writer.following.map(avatar =>
                  <a href={`/writer/view/${avatar.username}`}><div className="wrt-content">
                    <div className="search-result">
                      <div className="result-img"><img src={defaultdp} alt="dp" /></div>
                      <div className="result-names">
                        <unm>{avatar.username}</unm><br/>
                        <nm>{avatar.name}</nm>
                      </div>
                      <div className="result-ctrl"><Button class="normal-small">Follow</Button></div>
                  </div><br/>
                  <div className="result-divider"></div><br/>
                  </div></a> )
                } <br /><br />
              </div>
            </div> : <div></div>
          }

          { this.state.tab === 'followers' ? 
            <div className="wrt-dtl">
              <div className="dtl">
                { writer.followers.map(avatar =>
                  <a href={`/writer/view/${avatar.username}`}><div className="wrt-content">
                    <div className="search-result">
                      <div className="result-img"><img src={defaultdp} alt="dp" /></div>
                      <div className="result-names">
                        <unm>{avatar.username}</unm><br/>
                        <nm>{avatar.name}</nm>
                      </div>
                      <div className="result-ctrl"><Button class="normal-small">Follow</Button></div>
                  </div><br/>
                  <div className="result-divider"></div><br/>
                  </div></a> )
                } <br /><br />
              </div>
            </div> : <div></div>
          }

          { this.state.tab === 'published' ?
            <div className="item-dtl">
              <div className="dtl">
              { writer.pub_blogs.map(blog => 
                <a href={`/blog/view/${blog.pk}/`}><div className="dtl-content">
                  <br /><ttl>{blog.title}</ttl><br /><br />
                  <div className="content-nav">
                    <z>{blog.no_of_likes}</z>
                    { blog.likes.some(like => like.username === user.username ) ?
                      <button><i class="material-icons">favorite</i></button> :
                      <button><iu class="material-icons">favorite_border</iu></button>
                    } </div>
                </div></a> )
              } <br /><br />
              </div>
            </div> : <div></div>
          }

          { user.username === writer.username ? <div>
          { this.state.tab === 'archived' ?
            <div className="item-dtl">
              <div className="dtl">
              { writer.arch_blogs.map(blog => 
                <a href={`/blog/view/${blog.pk}/`}><div className="dtl-content">
                  <br /><ttl>{blog.title}</ttl><br /><br />
                  <div className="content-nav">
                    <z>{blog.no_of_likes}</z>
                    { blog.likes.some(like => like.username === user.username ) ?
                      <button><i class="material-icons">favorite</i></button> :
                      <button><iu class="material-icons">favorite_border</iu></button>
                    } </div>
                </div></a> )
              }<br /><br />
              </div>
            </div> : <div></div>
          }

          { this.state.tab === 'saved' ?
            <div className="item-dtl">
              <div className="dtl">
              { writer.saved_blogs.map(blog => 
                <a href={`/blog/view/${blog.pk}/`}><div className="dtl-content">
                  <br /><ttl>{blog.title}</ttl><br /><br />
                  <div className="content-nav">
                    <z>{blog.no_of_likes}</z>
                    { blog.likes.some(like => like.username === user.username ) ?
                      <button><i class="material-icons">favorite</i></button> :
                      <button><iu class="material-icons">favorite_border</iu></button>
                    } </div>
                </div></a> )
              }<br /><br />
              </div>
            </div> : <div></div> 
          }
          </div> : <div></div> }

      </div>
    );
  }
}

export default ViewAccount;
