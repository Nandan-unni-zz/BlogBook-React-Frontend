import React, { Component } from 'react';
import { Form, Input } from 'antd';

import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import { blogEditor } from '../../Services/BlogServices';
import { accountLogout } from '../../Services/AccountServices';

class EditBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: JSON.parse(localStorage.getItem('user')),
        title: "Django: The Python Framework",
        content: "Blog content",
        type: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmit = () => {
    blogEditor(this.state.title, this.state.content);
  }
  handleLogout = () => {
    accountLogout(this.state.user.pk)
    localStorage.removeItem('user')
  }
  render() {
    return (
      <div className="EditBlog">
        <Navbar>
          <a href="/" onClick={this.handleLogout}><i class="material-icons">power_settings_new</i><br/><z>Logout</z></a>
          <a href={`/account/view/${this.state.user.username}`}><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
          <a href="/feed/"><i class="material-icons">home</i><br/><z>Feeds</z></a>
        </Navbar><br /><br />
        <div className="blog-create">
          <Form onFinish={this.handleSubmit}>

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
            </Form.Item><br />

            <Form.Item>
              <div className="blog-create-nav">
                <Button class="normal">Save</Button>
              </div><br />
              <center><a href="/account/view/">Cancel</a></center>
            </Form.Item>

          </Form>
        </div>
      </div>
    );
  }
}

export default EditBlog;
