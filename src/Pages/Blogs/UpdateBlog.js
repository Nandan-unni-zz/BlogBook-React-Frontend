import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Redirect } from "react-router-dom";

import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import { updateBlogAPI, getBlogAPI } from '../../Services/BlogServices';
import { logoutWriterAPI } from '../../Services/WriterServices';

class EditBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: JSON.parse(localStorage.getItem('user')),
        blog: {},
        title: "",
        content: "",
        type: "",
        loaded: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  selectMethod = (method) => {
    this.setState({type: method})
  }
  handleSubmit = async () => {
    let response;
    if (this.state.type === 'archive')
      response = await updateBlogAPI(this.state.blog.pk, {"title": this.state.title, "content": this.state.content, "is_published": false});
    else
      response = await updateBlogAPI(this.state.blog.pk, {"title": this.state.title, "content": this.state.content, "is_published": true});
    if (response.status === 200)
      this.setState({isSuccess: true});
    else
      this.setState({errMsg: "Invalid content."})
  }
  handleLogout = () => {
    logoutWriterAPI(this.state.user.pk)
    localStorage.removeItem('user')
  }
  formRef = React.createRef();
  componentDidMount = async () => {
    await getBlogAPI(this.props.match.params.pk).then(res => {
      this.setState({ blog: res, loaded: true });
    });
    this.setState({title: this.state.blog.title, content: this.state.blog.content})
    console.log(this.state.blog.title)
    this.formRef.current.setFieldsValue({
      title: this.state.blog.title,
      content: this.state.blog.content
    });
  }
  render() {
    return (
      <div className="EditBlog">
        { this.state.loaded ? <div>
        { this.state.blog.author.username === this.state.user.username ? <div>
        <Navbar>
          <a href="/logout/" onClick={this.handleLogout}><i class="material-icons">power_settings_new</i><br/><z>Logout</z></a>
          <a href={`/writer/view/${this.state.user.username}`}><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
          <a href="/feed/"><i class="material-icons">home</i><br/><z>Feeds</z></a>
        </Navbar><br /><br />
        <div className="blog-create">
          <Form onFinish={this.handleSubmit} ref={this.formRef} >

            <center><h2>Edit Blog</h2></center><br />

            <label for="title">Title</label><br />
            <Form.Item
              name="title"  
              rules={[{required: true, min: 1, max: 40, message: "Enter 1-40 characters"}]}>
              <Input onChange={this.handleChange} defaultValue={this.state.title} />
            </Form.Item><br />

            <label for="content">Content</label><br />
            <Form.Item
              name="content"
              rules={[{required: true, message: "Write some blog content"}]}>
              <Input.TextArea onChange={this.handleChange} className="content" rows="15" defaultValue={this.state.content} />
            </Form.Item>

            <center>{!this.state.isSuccess ? <err>{this.state.errMsg}</err> : <Redirect to={`/blog/view/${this.state.blog.pk}`} />}</center>
            <br />

            <Form.Item>
              <div className="blog-create-nav">
                <Button class="outline" onClick={() => this.selectMethod('archive')}>Archive</Button> &nbsp; &nbsp; &nbsp;
                <Button class="normal" onClick={() => this.selectMethod('publish')}>Publish</Button>
              </div><br />
              <center><a href={`/writer/view/${this.state.user.username}`}>Cancel</a></center>
            </Form.Item>

          </Form>
        </div></div> : <Redirect to={`/feed/`} /> } </div> : <div></div> }
      </div>
    );
  }
}

export default EditBlog;
