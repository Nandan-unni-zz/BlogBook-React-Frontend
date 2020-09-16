import React, { Component } from 'react';

import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';

import { likeBlogAPI, saveBlogAPI, getBlogAPI } from '../../Services/BlogServices';

class ViewBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      blog: {}, 
      loaded: false,
    }
    this.handleLike = this.handleLike.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleLike = async (pk) => {
    const res = await likeBlogAPI(pk, this.state.user.pk);
    this.setState({ blogs: res.data })
  }
  handleSave = async (pk) => {
    const res = await saveBlogAPI(pk, this.state.user.pk);
    this.setState({ blogs: res.data })
  }
  componentDidMount() {
    getBlogAPI(this.props.match.params.pk).then(res => {
      this.setState({ blog: res, loaded: true });
      console.log(res, this.state.blog)
    });
  }
  render() {
    const blog = this.state.blog;
    return (
      <div className="Feed">
        <Navbar>
          <a href={`/writer/view/${this.state.user.username}`}><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
          <a href="/feed/"><i class="material-icons">home</i><br/><z>Feed</z></a>
        </Navbar>
        <div className="Blogs">
          <div className="Blog">
            <div className="Blog-Content">
              <h3>{blog.title}</h3>
              <a href={`/writer/view/${blog.author.username}`}>{blog.author.username}</a><br /><br />
              <p>{blog.content}</p><br/>
              { blog.author.username === this.state.user.username ?
              <div className="Blog-Nav">
                <z>{blog.no_of_likes}</z>
                { blog.likes.some(like => like.username === this.state.user.username ) ?
                <div className="Blog-Nav-left" onClick={() => this.handleLike(blog.pk)}><button><i class="material-icons">favorite</i></button></div> :
                <div className="Blog-Nav-left" onClick={() => this.handleLike(blog.pk)}><button><i class="material-icons">favorite_border</i></button></div>
                }
                { blog.saves.some(save => save.username === this.state.user.username ) ?
                <div className="Blog-Nav-right" onClick={() => this.handleSave(blog.pk)}><button><i class="material-icons">bookmark</i></button></div> :
                <div className="Blog-Nav-right" onClick={() => this.handleSave(blog.pk)}><button><i class="material-icons">bookmark_border</i></button></div>
                }
              </div> :
              <div className="Prof-ctrl">
                <div className="Blog-Nav-left"><Button class="normal" href={`/blog/edit/${blog.pk}`}>Edit Blog</Button></div>
                <div className="Blog-Nav-right"><Button class="danger" href={`/blog/delete/${blog.pk}`}>Delete Blog</Button></div>
              </div> }
            </div>
          </div>
        </div>
        <br/><br/><hr/>
      </div>
    );
  }
}

export default ViewBlog;
