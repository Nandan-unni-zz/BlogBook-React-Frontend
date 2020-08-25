import React, { Component } from 'react';
import { Form, Input } from 'antd';

import './CreateBlog.css';
import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import { blogCreater, blogSaver } from '../../Services/BlogServices';

class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: "",
        content: "",
        type: "",
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
  handleSubmit = () => {
    if (this.state.type === 'save')
      blogSaver(this.state.title, this.state.content);
    else
      blogCreater(this.state.title, this.state.content);
  }
  render() {
    return (
      <div className="CreateBlog">
        <Navbar>
          <a href="/account/logout/"><i class="material-icons">power_settings_new</i><z> Logout</z></a>
          <a href="/account/view/"><i class="material-icons">account_circle</i><z> Profile</z></a>
          <a href="/feed/"><i class="material-icons">home</i><z> Feeds</z></a>
        </Navbar><br /><br />
        <div className="blog-create">
          <Form onFinish={this.handleSubmit}>

            <center><h2>Create Blog</h2></center><br />

            <label for="title">Title</label><br />
            <Form.Item
              name="title"  
              rules={[{required: true, message: "Enter a title for your blog"}]}>
              <Input onChange={this.handleChange} />
            </Form.Item><br />

            <label for="content">Content</label><br />
            <Form.Item
              name="content"
              rules={[{required: true, message: "Write some blog content"}]}>
              <Input.TextArea onChange={this.handleChange} className="content" rows="15"/>
            </Form.Item><br />

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
