import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Redirect } from "react-router-dom";

import './Blogs.css';
import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import { blogCreater } from '../../Services/BlogServices';

class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: JSON.parse(localStorage.getItem('user')),
        title: "",
        content: "",
        type: "",
        status: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  selectMethod = (method) => {
    this.setState({type: method})
  }
  handleSubmit = async () => {
    let status;
    if (this.state.type === 'save')
      status = await blogCreater({"title": this.state.title, "content": this.state.content, "is_published": false, "author": this.state.user.pk});
    else
      status = await blogCreater({"title": this.state.title, "content": this.state.content, "is_published": true, "author": this.state.user.pk});
    if (status === 200)
        this.setState({isSuccess: true});
    else
        this.setState({errMsg: "Some error occured."})
}
  render() {
    return (
      <div className="CreateBlog">
        <Navbar>
          <a href="/logout/"><i class="material-icons">power_settings_new</i><br/><z>Logout</z></a>
          <a href="/writer/view/"><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
          <a href="/feed/"><i class="material-icons">home</i><br/><z>Feeds</z></a>
        </Navbar><br /><br />
        <div className="blog-create">
          <Form onFinish={this.handleSubmit}>

            <center><h2>Create Blog</h2></center><br />

            <label for="title">Title</label><br />
            <Form.Item
              name="title"  
              rules={[{required: true, min: 1, max: 40, message: "Enter 1-40 characters"}]}>
              <Input onChange={this.handleChange} />
            </Form.Item><br />

            <label for="content">Content</label><br />
            <Form.Item
              name="content"
              rules={[{required: true, message: "Write some blog content"}]}>
              <Input.TextArea onChange={this.handleChange} className="content" rows="15"/>
            </Form.Item>
            <center>{!this.state.isSuccess ? <err>{this.state.errMsg}</err> : <Redirect to="/feed/" />}</center>
            <br />

            <Form.Item>
              <div className="blog-create-nav">
                <Button class="outline" onClick={() => this.selectMethod('save')}>Save</Button> &nbsp; &nbsp; &nbsp;
                <Button class="normal" onClick={() => this.selectMethod('publish')}>Publish</Button>
              </div><br />
              <center><a href="/feed/">Discard</a></center>
            </Form.Item>

          </Form>
        </div>
      </div>
    );
  }
}

export default CreateBlog;
